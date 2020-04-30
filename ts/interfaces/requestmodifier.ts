export type TRequestModifier = (responseArg: {
  headers: { [header: string]: string | string[] | undefined };
  path: string;
  requestContent: string;
}) => Promise<{
  headers: { [header: string]: string | string[] | undefined };
  path: string;
  requestContent: string;
}>;
