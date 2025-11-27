// ./index.ts
import CepService from './CepService.ts';
import { FooCepAPI } from './FooCepApi.ts';

const cepApi = new FooCepAPI()

async function main() {
  const cepSvc = new CepService(cepApi);

  console.log(
    'get address by cep', 
    '->', 
    await cepSvc.addressByCep('xx.xxx-xx', 10),
  );
  console.log(
    'get cep by address', 
    '->', 
    await cepSvc.cepByAddress('street foo, between bar and baz', 10),
  );
}

main();