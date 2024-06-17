import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import {
  GetVmsFormPictObjectSchema,
  VmsFormPictObjectScheme,
} from '@/api-v1/vms-form-object-pict/vms-form-object-pict.model';
import { vmsFormPictObjectService } from '@/api-v1/vms-form-object-pict/vms-form-object-pict.service';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';
import { HttpMethods } from '@/common/utils/httpMethods';

export const vmsFormPictObjectRegistry = new OpenAPIRegistry();

vmsFormPictObjectRegistry.register('VmsFormObjectPict', VmsFormPictObjectScheme);

export const vmsFormPictObjectRouter: Router = (() => {
  const router = express.Router();

  vmsFormPictObjectRegistry.registerPath({
    method: HttpMethods.GET,
    path: 'api/v1/vms/form/object/pict',
    tags: ['VmsFormObjectPict'],
    request: { query: GetVmsFormPictObjectSchema.shape.findAllQuery },
    responses: createApiResponse(VmsFormPictObjectScheme, 'Success'),
  });

  router.get('/', validateRequest(GetVmsFormPictObjectSchema), async (req: Request, res: Response) => {
    const { formId } = req.query;
    const serviceResponse = await vmsFormPictObjectService.findAll(String(formId));
    handleServiceResponse(serviceResponse, res);
  });
  return router;
})();
