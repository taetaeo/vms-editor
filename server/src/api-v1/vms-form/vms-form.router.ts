import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { GetVmsFormSchema, VmsFormScheme } from '@/api-v1/vms-form/vms-form.model';
import { vmsService } from '@/api-v1/vms-form/vms-form.service';
import routeConfig from '@/common/configs/route.config';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';
import { HttpMethods } from '@/common/utils/httpMethods';

export const vmsFormRegistry = new OpenAPIRegistry();

vmsFormRegistry.register('VmsForm', VmsFormScheme);

export const vmsFormRouter: Router = (() => {
  const router = express.Router();
  vmsFormRegistry.registerPath({
    method: HttpMethods.GET,
    path: `${routeConfig.api}${routeConfig.version_1}/vms/form/{formId}`,
    tags: ['VmsForm'],
    request: { params: GetVmsFormSchema.shape.params },
    responses: createApiResponse(VmsFormScheme, 'Success'),
  });
  router.get('/:formId', validateRequest(GetVmsFormSchema), async (req: Request, res: Response) => {
    const formId = req.params.formId;
    const serviceResponse = await vmsService.findById(formId);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
