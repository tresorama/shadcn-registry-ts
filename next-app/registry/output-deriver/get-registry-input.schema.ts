import z from "zod";
import { registrySchema as schemaShadcnRegistry } from "shadcn/registry";


// types
export type RegistryInputJson = z.infer<typeof schemaRegistryInputJson>;
export type RegistryInputJsonItem = RegistryInputJson['items'][number];


// schema
export const schemaRegistryInputJson = schemaShadcnRegistry
  .omit({ items: true })
  .extend({
    items: z.array(
      schemaShadcnRegistry.shape.items.element.extend({
        EXTRA_METADATA_FOR_NEXT: z.optional(
          z.object({
            fileExample: z.object({
              path: z.string(),
            }),
            fileTest: z.optional(z.object({
              path: z.string(),
            })),
          })
        )
      })
    )
  });