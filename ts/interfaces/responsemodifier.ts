export type TResponseModifier = (responseArg: {
  headers: {[header: string]: number | string | string[] | undefined};
  path: string;
  responseContent: string;
}) => Promise<{
  headers: {[header: string]: number | string | string[] | undefined};
  path: string;
  responseContent: string;
}>;
