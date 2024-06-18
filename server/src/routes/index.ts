import express from 'express';

import { openAPIRouter } from '@/api-docs/openAPIRouter';
import { vmsFormRouter } from '@/api-v1/vms-form/vms-form.router';
import { vmsFormPictObjectRouter } from '@/api-v1/vms-form-object-pict/vms-form-object-pict.router';
import errorHandler from '@/common/middleware/errorHandler';

const routers = express.Router();

routers.use('/vms/form/', vmsFormRouter);
routers.use('/vms/form/pict', vmsFormPictObjectRouter);
// Swagger UI
routers.use(openAPIRouter);

// Error handlers
routers.use(errorHandler());

export { routers };
