import { Profile, ProfileService } from "@modules/core/profile";
import { ForumCreateDto } from "../dtos/forum-create.dto";
import { Forum } from "../models/forum.model";
import { AppError } from "@shared/errors/app-error";
import { Includeable } from "sequelize";
import {
  ForumFullAttributesDto,
  ForumFullAttributesSchema,
} from "../dtos/forum-full-attributes.dto";
import { ForumUpdateDto } from "../dtos/forum-update.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { ForumAttributes } from "../interfaces/forum.interface";
import db from "@config/database";
import { Like } from "../models/like.model";

export class ForumService {
  static FORUMS_PER_PAGE = 45;
  static OFFSET = (page: number) => (page - 1) * this.FORUMS_PER_PAGE;

  static getForumByID = async (
    id: string,
    profileId: string | null = null
  ): Promise<ForumFullAttributesDto> => {
    const forum = await Forum.findByPk(id, {
      include: [
        ForumUtils.includeWriterObj,
        ForumUtils.includeLiked(profileId),
      ],
    });
    if (!forum) throw new AppError("No Forum found.", 404);

    return ForumFullAttributesSchema.parse(forum.get({ plain: true }));
  };

  static getForumsByProfileID = async (
    id: string,
    page: number
  ): Promise<ForumFullAttributesDto[]> => {
    const forums = await Forum.findAll({
      where: { profileId: id },
      include: [ForumUtils.includeWriterObj, ForumUtils.includeLiked(id)],
      limit: this.FORUMS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
    });

    return forums.map((f) =>
      ForumFullAttributesSchema.parse(f.get({ plain: true }))
    );
  };

  static getLatestForums = async (
    page: number,
    profileId: string | null = null
  ): Promise<ForumFullAttributesDto[]> => {
    const forums = await Forum.findAll({
      include: [
        ForumUtils.includeWriterObj,
        ForumUtils.includeLiked(profileId),
      ],
      limit: this.FORUMS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
    });

    return forums.map((f) =>
      ForumFullAttributesSchema.parse(f.get({ plain: true }))
    );
  };

  static createForum = async (
    data: ForumCreateDto,
    profileId: string
  ): Promise<ForumFullAttributesDto> => {
    return await db.transaction(async (t) => {
      const profile = await ProfileService.getProfileByID(profileId);

      await Profile.increment({ forums: 1 }, { where: { id: profile.id } });

      const forum = await Forum.create(
        { ...data, profileId },
        { include: ForumUtils.includeWriterObj }
      );
      return ForumFullAttributesSchema.parse(forum.get({ plain: true }));
    });
  };

  static updateForum = async (
    data: ForumUpdateDto,
    profileId: string
  ): Promise<ForumFullAttributesDto> => {
    return await db.transaction(async (t) => {
      const { id, ...updateData } = data;

      const forum = await Forum.findOne({
        where: { id, profileId },
        include: ForumUtils.includeWriterObj,
      });
      if (!forum) throw new AppError("Invalid Request.", 406);

      const cleanData = removeUndefined(updateData);

      await forum.update({ ...(cleanData as Partial<ForumAttributes>) });
      return ForumFullAttributesSchema.parse(forum.get({ plain: true }));
    });
  };

  static deleteForum = async (
    id: string,
    profileId: string
  ): Promise<ForumFullAttributesDto> => {
    return await db.transaction(async (t) => {
      const forum = await Forum.findOne({
        where: { id, profileId },
        include: ForumUtils.includeWriterObj,
      });
      if (!forum) throw new AppError("Invalid Request.", 406);

      const forumData = forum.get({ plain: true });

      await Profile.decrement({ forums: 1 }, { where: { id: profileId } });

      await forum.destroy();
      return ForumFullAttributesSchema.parse(forumData);
    });
  };
}

class ForumUtils {
  static includeWriterObj: Includeable = {
    model: Profile,
    as: "writer",
  };

  static includeLiked = (profileId: string | null): Includeable => {
    return profileId
      ? {
          model: Like,
          where: { profileId },
          required: false,
        }
      : {};
  };
}
