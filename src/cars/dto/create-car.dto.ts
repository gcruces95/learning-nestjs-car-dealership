import { IsString, IsNotEmpty } from "class-validator";

export class CreateCarDto {

  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @IsString()
  @IsNotEmpty()
  readonly model: string;

}

