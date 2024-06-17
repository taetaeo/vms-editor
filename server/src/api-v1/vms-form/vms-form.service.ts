import { StatusCodes } from 'http-status-codes';

import { VmsForm } from '@/api-v1/vms-form/vms-form.model';
import { vmsFormRepository } from '@/api-v1/vms-form/vms-form.repository';
import { vmsFormObjectRepository } from '@/api-v1/vms-form-object/vms-form-object.repository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const vmsService = {
  // Retrieves all vms from the database
  findAll: async () => {
    try {
      const founded_vms_objects: any[] = [];

      return new ServiceResponse(ResponseStatus.Success, 'VMS Forms Found', founded_vms_objects, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all VMS FORM : $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  findById: async (formId: string): Promise<ServiceResponse<VmsForm | null>> => {
    try {
      const form = await vmsFormRepository.findByIdAsync(formId);
      if (!form) {
        return new ServiceResponse(ResponseStatus.Failed, 'Form not found', null, StatusCodes.NOT_FOUND);
      }
      const snapshot = { ...form };

      const selectedObject = await vmsFormObjectRepository.findByIdAsync(form.vmsFormId);

      snapshot.objects = selectedObject;

      return new ServiceResponse(ResponseStatus.Success, 'VMS Forms Found', snapshot, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all VMS FORM : $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
