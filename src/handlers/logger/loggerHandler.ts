export async function RequestLoggerWithParams(
  apiNameLogs: string,
  paramsLogs: any = []
) {
  console.log(
    `============================${apiNameLogs}===================================`
  );
  await paramsLogs.forEach((param: any) => {
    console.log(`${param.name}, ${param.value}`);
  });
  console.log(
    `=====================================End========================================`
  );
}
export async function RequestLogger(apiNameLogs: string, paramsLogs: {}) {
  console.log(
    `============================${apiNameLogs}===================================`
  );

  console.log(`${JSON.stringify(paramsLogs)}`);

  console.log(
    `=====================================End========================================`
  );
}
