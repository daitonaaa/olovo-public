import { CityEntity } from '../../../entities/city';
import { CityResponse } from './dto/settings.respone';

export const mapCityToResponse = (db: CityEntity): CityResponse => {
  const resp = new CityResponse();
  resp.name = db.name;
  resp.id = db.id;
  resp.lg = db.lg;
  resp.lt = db.lt;
  return resp;
};
