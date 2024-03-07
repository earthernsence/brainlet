import { v } from "convex/values";

import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const getSidebar = query({
  args: {
    parent: v.optional(v.id("documents"))
  },
  handler: async(ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", q =>
        q.eq("userId", userId)
          .eq("parent", args.parent)
      ).filter(q =>
        q.eq(q.field("isArchived"), false)
      ).order("desc")
      .collect();

    return documents;
  }
});

export const get = query({
  handler: async ctx => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated!");
    }

    const documents = await ctx.db.query("documents").collect();

    return documents;
  }
});

export const create = mutation({
  args: {
    title: v.string(),
    parent: v.optional(v.id("documents"))
  },
  handler: async(ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated!");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parent: args.parent,
      userId,
      isArchived: false,
      isPublished: false
    });

    return document;
  }
});