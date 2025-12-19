import { AppError } from "@shared/errors/app-error";
import { Institute } from "./institute.model";

export class InstituteService {
  static INSTITUTES_PER_PAGE = 30;
  static OFFSET = (page: number) => (page - 1) * this.INSTITUTES_PER_PAGE;

  static getById = async (id: string) => {
    const institute = await Institute.findByPk(id);
    if (!institute) throw new AppError("No Institute Found.", 404);

    return institute.get({ plain: true });
  };

  static getAll = async (page: number) => {
    const institutes = await Institute.findAll({
      offset: this.OFFSET(page),
      limit: this.INSTITUTES_PER_PAGE,
      order: [["updateDate", "desc"]],
    });

    return institutes.map((i) => i.get({ plain: true }));
  };
}
