import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const vmsFormObjectService = {
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

  findById: async (formId: string, objectId: string): Promise<ServiceResponse<null | any>> => {
    try {
      console.log(`FindById with formId : ${formId} & objectId : ${objectId}`);
      const founded_vms_form_object: object = {};
      return new ServiceResponse(ResponseStatus.Success, "VMS Form's Object", founded_vms_form_object, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error findings specific VMS from's object : $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
