export const transformTime = (time: string): string => {
  if (!time) {
    // time -162.747975
    return "0";
  }
  const parts: string[] = (time + "").split("."); // parts [ '-162', '747975' ]
  const minuteSec: string = (+`0.${parts[1]}` * 60).toString(); // minuteSec 44.878499999999995
  const minute: string = minuteSec.split(".")[0];
  const sec: string = (+minuteSec.split(".")[1] * 60) // sec 52
    .toString()
    .substring(0, 2);
  const result = `${parts[0]}:${
    minute.length === 1 ? "0" + minute : minute
  }:${sec}`;

  return result;
};
