import { Injectable } from '@nestjs/common';
import { AppConfig } from '../../../../common/config/models/app.config';

const create_robots_txt = (hostname: string) => `User-agent: *   
Disallow: /*utm*=
Disallow: /*utm_*
Disallow: /*debug=
Disallow: /?
Disallow: /*et_fb=
Disallow: /*PageSpeed=
Disallow: /*yhid=
Disallow: /*yclid=
Disallow: /*gclid=
Disallow: /*fbclid=
Disallow: /*placement=
Disallow: /*from=
Disallow: /*q=
Disallow: /*stat-id=
Disallow: /*yandex_ad_client_id=
Disallow: /*yandex_ad_order_id=
Disallow: /*anyquery=
Disallow: /*page_id=
Disallow: /*preview=
Disallow: /*debug=
Disallow: /*loan=
Disallow: /*period=
Disallow: /*fullName=
Disallow: /*phone=
Disallow: /*email=
Disallow: /*.pdf
Disallow: /*.doc
Disallow: /*.docx
Disallow: /*.xls
Disallow: /*.xlsx
Sitemap: ${hostname}/sitemap.xml`;

@Injectable()
export class RobotsService {
  constructor(private readonly appConfig: AppConfig) {}

  get_txt(): string {
    return create_robots_txt(this.appConfig.clientHostname).trim();
  }
}
