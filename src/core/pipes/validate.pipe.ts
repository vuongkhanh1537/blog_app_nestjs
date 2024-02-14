import { ArgumentMetadata, BadRequestException, Injectable, UnprocessableEntityException, ValidationPipe } from "@nestjs/common";

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
    public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        try {
            return await super.transform(value, metadata);
        } catch (err) {
            if (err instanceof BadRequestException)  {
                throw new UnprocessableEntityException(this.handleError(err.message));
            }
        }
    }

    private handleError(errors) {
        return errors.map(error => error.constraints);
    }
}