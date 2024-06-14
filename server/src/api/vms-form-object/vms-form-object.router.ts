import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';
import { HttpMethods } from '@/common/utils/httpMethods';

import { GetVmsFormObjectSchema, VmsFormObjectScheme } from './vms-form-object.model';
import { vmsFormObjectService } from './vms-form-object.service';

export const vmsFormObjectRegistry = new OpenAPIRegistry();

vmsFormObjectRegistry.register('VmsFormObject', VmsFormObjectScheme);

export const vmsFormObjectRouter: Router = (() => {
  const router = express.Router();

  vmsFormObjectRegistry.registerPath({
    method: HttpMethods.GET,
    path: '/vms/form/object/',
    tags: ['VmsFormObject'],
    request: { query: GetVmsFormObjectSchema.shape.query },
    responses: createApiResponse(VmsFormObjectScheme, 'Success'),
  });

  router.get('/', validateRequest(GetVmsFormObjectSchema), async (req: Request, res: Response) => {
    const { formId, objectId } = req.query;
    const serviceResponse = await vmsFormObjectService.findById(String(formId), String(objectId));
    handleServiceResponse(serviceResponse, res);
  });
  return router;
})();
