import { Transform } from "class-transformer";
import { IsAlphanumeric, IsMongoId, IsOptional, IsString } from "class-validator";
import { PersianLatinNumber } from "src/common/decorators/credit-number.decorator";
import { convertToEn } from "src/common/helper";

export class CreateProductDto {
    @IsString({message: `نام باید به صورت حروف وارد شود`})
    name: string;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: 'مقدار وارد شده برای قیمت باید به صورت عدد وارد شود'})
    price: number;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: 'مقدار وارد شده برای تعداد باید به صورت عدد وارد شود'})
    quantity: number;

    @IsString({message: `توضیحات باید به صورت حروف وارد شود`})
    @IsOptional()
    description?: string;

    @IsAlphanumeric('en-US', {message: `کد به درستی وارد نشده است`})
    code: string;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: 'مقدار وارد شده برای تخفیف باید به صورت عدد وارد شود'})
    discount?: number;

    @IsMongoId({message: `دسته به درستی وارد نشده است`})
    category: string;
}
