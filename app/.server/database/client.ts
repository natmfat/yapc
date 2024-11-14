import { MockDatabase } from "shitgen/MockDatabase";
import { Model } from "shitgen/client/Model";
export { sql } from "shitgen/client/sql";
const database = new MockDatabase({
    "types": {
        "user_provider_strategy_": {
            "name": "user_provider_strategy_",
            "type": "enum",
            "typeArgs": [
                "google",
                "discord",
                "github",
                "form"
            ]
        }
    },
    "tables": {
        "user_": {
            "name": "user_",
            "columns": [
                {
                    "type": "bigint",
                    "modifierPrimaryKey": true,
                    "modifierNotNull": true,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": false,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": false,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": false,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": false,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": false,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": false,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": false,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": false,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": false,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "boolean",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": true,
                    "reference": null
                }
            ]
        },
        "user_provider_": {
            "name": "user_provider_",
            "columns": [
                {
                    "type": "bigint",
                    "modifierPrimaryKey": true,
                    "modifierNotNull": true,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "bigint",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": {
                        "tableName": "user_",
                        "columnName": "id"
                    }
                },
                {
                    "type": "user_provider_strategy_",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": null
                }
            ]
        },
        "role_": {
            "name": "role_",
            "columns": [
                {
                    "type": "bigint",
                    "modifierPrimaryKey": true,
                    "modifierNotNull": true,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": null
                },
                {
                    "type": "int",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": true,
                    "reference": null
                }
            ]
        },
        "user_role_": {
            "name": "user_role_",
            "columns": [
                {
                    "type": "bigint",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": {
                        "tableName": "user_",
                        "columnName": "id"
                    }
                },
                {
                    "type": "bigint",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": {
                        "tableName": "role_",
                        "columnName": "id"
                    }
                }
            ]
        },
        "post_update_type_": {
            "name": "post_update_type_",
            "columns": [
                {
                    "type": "bigint",
                    "modifierPrimaryKey": true,
                    "modifierNotNull": true,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": null
                }
            ]
        },
        "post_": {
            "name": "post_",
            "columns": [
                {
                    "type": "bigint",
                    "modifierPrimaryKey": true,
                    "modifierNotNull": true,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "bigint",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": {
                        "tableName": "user_",
                        "columnName": "id"
                    }
                },
                {
                    "type": "bigint",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": {
                        "tableName": "post_update_type_",
                        "columnName": "id"
                    }
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": false,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "bigint",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "boolean",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "TIMESTAMPTZ",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "TIMESTAMPTZ",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": true,
                    "reference": null
                }
            ]
        },
        "tag_": {
            "name": "tag_",
            "columns": [
                {
                    "type": "bigint",
                    "modifierPrimaryKey": true,
                    "modifierNotNull": true,
                    "modifierDefault": true,
                    "reference": null
                },
                {
                    "type": "text",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": null
                },
                {
                    "type": "boolean",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": true,
                    "reference": null
                }
            ]
        },
        "post_tag_": {
            "name": "post_tag_",
            "columns": [
                {
                    "type": "bigint",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": {
                        "tableName": "post_",
                        "columnName": "id"
                    }
                },
                {
                    "type": "bigint",
                    "modifierPrimaryKey": false,
                    "modifierNotNull": true,
                    "modifierDefault": false,
                    "reference": {
                        "tableName": "tag_",
                        "columnName": "id"
                    }
                }
            ]
        }
    }
});
export enum UserProviderStrategy {
  GOOGLE = "google",
  DISCORD = "discord",
  GITHUB = "github",
  FORM = "form"
}
export type UserData = {
  id: number;
  avatar_url: string;
  banner_url: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  social_twitter: string | null;
  social_github: string | null;
  social_discord: string | null;
  social_youtube: string | null;
  social_website: string | null;
  onboarding_complete: boolean;
}
export type UserAutoGenerated = "id";
export type UserOptional = "id" | "banner_url" | "username" | "first_name" | "last_name" | "bio" | "social_twitter" | "social_github" | "social_discord" | "social_youtube" | "social_website" | "onboarding_complete";
export type UserRelationship = {
}
const user = new Model<UserData, UserAutoGenerated, UserOptional, UserRelationship>("user_", database);
export type UserProviderData = {
  id: number;
  user_id: number;
  strategy: UserProviderStrategy;
  profile_id: string;
  profile_password: string;
}
export type UserProviderAutoGenerated = "id";
export type UserProviderOptional = "id";
export type UserProviderRelationship = {
  user_id: UserData;
}
const userProvider = new Model<UserProviderData, UserProviderAutoGenerated, UserProviderOptional, UserProviderRelationship>("user_provider_", database);
export type RoleData = {
  id: number;
  name: string;
  description: string;
  level: number;
}
export type RoleAutoGenerated = "id";
export type RoleOptional = "id" | "level";
export type RoleRelationship = {
}
const role = new Model<RoleData, RoleAutoGenerated, RoleOptional, RoleRelationship>("role_", database);
export type UserRoleData = {
  user_id: number;
  role_id: number;
}
export type UserRoleAutoGenerated = never;
export type UserRoleOptional = never;
export type UserRoleRelationship = {
  user_id: UserData;
  role_id: RoleData;
}
const userRole = new Model<UserRoleData, UserRoleAutoGenerated, UserRoleOptional, UserRoleRelationship>("user_role_", database);
export type PostUpdateTypeData = {
  id: number;
  name: string;
}
export type PostUpdateTypeAutoGenerated = "id";
export type PostUpdateTypeOptional = "id";
export type PostUpdateTypeRelationship = {
}
const postUpdateType = new Model<PostUpdateTypeData, PostUpdateTypeAutoGenerated, PostUpdateTypeOptional, PostUpdateTypeRelationship>("post_update_type_", database);
export type PostData = {
  id: number;
  user_id: number;
  update_type_id: number;
  heading: string;
  body: string;
  embed: string | null;
  stars: number;
  pinned: boolean;
  created_at: string;
  updated_at: string;
}
export type PostAutoGenerated = "id";
export type PostOptional = "id" | "embed" | "stars" | "pinned" | "created_at" | "updated_at";
export type PostRelationship = {
  user_id: UserData;
  update_type_id: PostUpdateTypeData;
}
const post = new Model<PostData, PostAutoGenerated, PostOptional, PostRelationship>("post_", database);
export type TagData = {
  id: number;
  name: string;
  approved: boolean;
}
export type TagAutoGenerated = "id";
export type TagOptional = "id" | "approved";
export type TagRelationship = {
}
const tag = new Model<TagData, TagAutoGenerated, TagOptional, TagRelationship>("tag_", database);
export type PostTagData = {
  post_id: number;
  tag_id: number;
}
export type PostTagAutoGenerated = never;
export type PostTagOptional = never;
export type PostTagRelationship = {
  post_id: PostData;
  tag_id: TagData;
}
const postTag = new Model<PostTagData, PostTagAutoGenerated, PostTagOptional, PostTagRelationship>("post_tag_", database);
export const shitgen = { user, userProvider, role, userRole, postUpdateType, post, tag, postTag };