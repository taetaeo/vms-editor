import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { vmsFormRegistry } from '@/api-v1/vms-form/vms-form.router';
import { vmsFormObjectRegistry } from '@/api-v1/vms-form-object/vms-form-object.router';
import { vmsFormPictObjectRegistry } from '@/api-v1/vms-form-object-pict/vms-form-object-pict.router';

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([
    vmsFormRegistry,
    vmsFormObjectRegistry,
    vmsFormPictObjectRegistry,
  ]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Swagger API',
    },
    externalDocs: {
      description: 'View the raw OpenAPI Specification in JSON format',
      url: '/swagger.json',
    },
  });
}
