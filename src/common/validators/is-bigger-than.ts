import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/**
 * Article source: https://stackoverflow.com/questions/59980341/can-i-compare-number-variables-with-class-validator
 * @param property
 * @param validationOptions
 * @returns
 */
export function IsBiggerThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBiggerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          let relatedValue = (args.object as any)[relatedPropertyName];
          if (typeof relatedValue == 'undefined') relatedValue = value;
          return (
            typeof value === 'number' &&
            typeof relatedValue === 'number' &&
            value >= relatedValue
          );
        },
      },
    });
  };
}
