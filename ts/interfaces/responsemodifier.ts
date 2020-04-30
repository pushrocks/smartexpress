export type TResponseModifier = <T>(responseArg: {
  headers: { [header: string]: number | string | string[] | undefined };
  path: string;
  responseContent: string;
  travelData?: T;
}) => Promise<{
  headers: { [header: string]: number | string | string[] | undefined };
  path: string;
  responseContent: string;
  travelData?: T;
}>;
