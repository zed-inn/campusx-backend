import { EndpointDetails } from "@shared/docs/readme-types";
import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";
import { Router, RequestHandler } from "express";
import { object, ZodObject, ZodType } from "zod";

export class DetailedRouter {
  public router = Router();
  public definitions: EndpointDetails[] = [];

  constructor(public categoryName: string) {}

  body(schema: ZodObject) {
    return new RouteBuilder(this).body(schema);
  }

  query(schema: ZodObject) {
    return new RouteBuilder(this).query(schema);
  }

  describe(title: string, desc: string) {
    return new RouteBuilder(this).describe(title, desc);
  }

  use(path: string, subRouter: DetailedRouter) {
    if (!subRouter) {
      throw new Error(
        `DetailedRouter.use() failed: Sub-router at '${path}' is undefined. Check for circular imports.`
      );
    }

    this.router.use(path, subRouter.router);

    const subDocs = subRouter.definitions.map((doc) => ({
      ...doc,
      endpoint: `${path}${doc.endpoint}`.replace("//", "/"),
    }));

    this.definitions.push(...subDocs);

    return this;
  }
}

class RouteBuilder {
  private meta: Partial<EndpointDetails> & {
    _requiresAuth?: boolean;
    _requiresProfile?: boolean;
    _requiresAdmin?: boolean;
  } = {
    response: { message: "Success" },
  };

  constructor(private parent: DetailedRouter) {}

  auth() {
    this.meta._requiresAuth = true;
    return this;
  }

  userProfiled() {
    this.meta._requiresAuth = true;
    this.meta._requiresProfile = true;
    return this;
  }

  admin() {
    this.meta._requiresAuth = true;
    this.meta._requiresAdmin = true;
    return this;
  }

  body(schema: ZodObject) {
    this.meta.body = schema;
    return this;
  }

  query(schema: ZodObject) {
    this.meta.query = schema;
    return this;
  }

  output(field: string, schema: ZodType, message?: string): this;
  output(schema: ZodObject<any>, message?: string): this;
  output(message?: string): this;

  output(
    arg1: string | ZodObject<any> = "Success",
    arg2: ZodType | string = "Success",
    arg3: string = "Success"
  ) {
    if (typeof arg1 === "string" && arg2 instanceof ZodType) {
      const field = arg1 as string;
      const schema = arg2 as ZodType;
      const message = arg3 as string;
      this.meta.response = { message, data: object({ [field]: schema }) };
    } else if (arg1 instanceof ZodObject) {
      const schema = arg1 as ZodObject;
      const message = arg2 as string;
      this.meta.response = { message, data: schema };
    } else {
      const message = arg1 as string;
      this.meta.response = { message };
    }

    return this;
  }

  describe(title: string, desc: string) {
    this.meta.title = title;
    this.meta.description = desc;
    return this;
  }

  post(path: string, ...handlers: RequestHandler[]) {
    return this.register("post", path, handlers);
  }

  get(path: string, ...handlers: RequestHandler[]) {
    return this.register("get", path, handlers);
  }

  patch(path: string, ...handlers: RequestHandler[]) {
    return this.register("patch", path, handlers);
  }

  delete(path: string, ...handlers: RequestHandler[]) {
    return this.register("delete", path, handlers);
  }

  put(path: string, ...handlers: RequestHandler[]) {
    return this.register("put", path, handlers);
  }

  private register(
    method: EndpointDetails["method"],
    path: string,
    handlers: RequestHandler[]
  ) {
    const middlewares: RequestHandler[] = [];

    if (this.meta._requiresAuth) {
      middlewares.push(RestrictTo.loggedInUser);
    }

    if (this.meta._requiresProfile) {
      middlewares.push(RestrictTo.profiledUser);
    }

    if (this.meta._requiresAdmin) {
      middlewares.push(RestrictTo.adminUser);
    }

    if (this.meta.body) {
      middlewares.push(ValidateReq.body(this.meta.body));
    }
    if (this.meta.query) {
      middlewares.push(ValidateReq.query(this.meta.query));
    }

    this.parent.router[method as "get" | "post" | "patch" | "delete" | "put"](
      path,
      ...middlewares,
      ...handlers
    );

    const doc: EndpointDetails = {
      category: this.parent.categoryName,
      method,
      endpoint: path,
      title: this.meta.title || "Untitled",
      description: this.meta.description || "",

      authTokenReq: this.meta._requiresAuth || false,

      response: this.meta.response!,
      ...(this.meta.body ? { body: this.meta.body } : {}),
      ...(this.meta.query ? { query: this.meta.query } : {}),
    };

    this.parent.definitions.push(doc);
    return this.parent;
  }
}
