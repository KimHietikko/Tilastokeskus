import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})
export class FrontPageComponent {
  multi: any[] = [];
  view: any[] = [700, 700];
  postNumbers = [];

  public checks: Array<any> = [
    { description: 'X-koordinaatti metreinä', value: 'euref_x' },
    { description: 'Y-koordinaatti metreinä', value: 'euref_y' },
    { description: 'Postinumeroalueen pinta-ala', value: 'pinta_ala' },
    { description: 'Asukkaat yhteensä, 2019', value: 'he_vakiy' },
    { description: 'Miehet, 2019', value: 'he_miehet' },
    { description: 'Naiset, 2019', value: 'he_naiset' },
    { description: 'Asukkaiden keski-ikä, 2019', value: 'he_kika' },
    { description: '0-2-vuotiaat, 2019', value: 'he_0_2' },
    { description: '3-6-vuotiaat, 2019', value: 'he_3_6' },
    { description: '7-12-vuotiaat, 2019', value: 'he_7_12' },
    { description: '13-15-vuotiaat, 2019', value: 'he_13_15' },
    { description: '16-17-vuotiaat, 2019', value: 'he_16_17' },
    { description: '18-19-vuotiaat, 2019', value: 'he_18_19' },
    { description: '20-24-vuotiaat, 2019', value: 'he_20_24' },
    { description: '25-29-vuotiaat, 2019', value: 'he_25_29' },
    { description: '30-34-vuotiaat, 2019', value: 'he_30_34' },
    { description: '35-39-vuotiaat, 2019', value: 'he_35_39' },
    { description: '40-44-vuotiaat, 2019', value: 'he_40_44' },
    { description: '45-49-vuotiaat, 2019', value: 'he_45_49' },
    { description: '50-54-vuotiaat, 2019', value: 'he_50_54' },
    { description: '55-59-vuotiaat, 2019', value: 'he_55_59' },
    { description: '60-64-vuotiaat, 2019', value: 'he_60_64' },
    { description: '65-69-vuotiaat, 2019', value: 'he_65_69' },
    { description: '70-74-vuotiaat, 2019', value: 'he_70_74' },
    { description: '75-79-vuotiaat, 2019', value: 'he_75_79' },
    { description: '80-84-vuotiaat, 2019', value: 'he_80_84' },
    { description: '85 vuotta täyttäneet, 2019', value: 'he_85_' },
    { description: '18 vuotta täyttäneet yhteensä, 2019', value: 'ko_ika18y' },
    { description: 'Perusasteen suorittaneet, 2019', value: 'ko_perus' },
    { description: 'Koulutetut yhteensä, 2019', value: 'ko_koul' },
    {
      description: 'Ylioppilastutkinnon suorittaneet, 2019',
      value: 'ko_yliop',
    },
    {
      description: 'Ammatillisen tutkinnon suorittaneet, 2019',
      value: 'ko_ammat',
    },
    {
      description: 'Alemman korkeakoulututkinnon suorittaneet, 2019',
      value: 'ko_al_kork',
    },
    {
      description: 'Ylemmän korkeakoulututkinnon suorittaneet, 2019',
      value: 'ko_yl_kork',
    },
    { description: '18 vuotta täyttäneet yhteensä, 2019', value: 'hr_tuy' },
    { description: 'Asukkaiden keskitulot, 2019', value: 'hr_ktu' },
    { description: 'Asukkaiden mediaanitulot, 2019', value: 'hr_mtu' },
    {
      description: 'Alimpaan tuloluokkaan kuuluvat asukkaat, 2019',
      value: 'hr_pi_tul',
    },
    {
      description: 'Keskimmäiseen tuloluokkaan kuuluvat asukkaat, 2019',
      value: 'hr_ke_tul',
    },
    {
      description: 'Ylimpään tuloluokkaan kuuluvat asukkaat, 2019',
      value: 'hr_hy_tul',
    },
    { description: 'Asukkaiden ostovoimakertymä, 2019', value: 'hr_ovy' },
    { description: 'Taloudet yhteensä, 2019', value: 'te_taly' },
    { description: 'Talouksien keskikoko, 2019', value: 'te_takk' },
    { description: 'Asumisväljyys, 2019', value: 'te_as_valj' },
    { description: 'Yksinasuvien taloudet, 2019', value: 'te_yks' },
    { description: 'Nuorten yksinasuvien taloudet, 2019', value: 'te_nuor' },
    {
      description: 'Lapsettomat nuorten parien taloudet, 2019',
      value: 'te_eil_np',
    },
    { description: 'Lapsitaloudet, 2019', value: 'te_laps' },
    { description: 'Pienten lasten taloudet, 2019', value: 'te_plap' },
    {
      description: 'Alle kouluikäisten lasten taloudet, 2019',
      value: 'te_aklap',
    },
    { description: 'Kouluikäisten lasten taloudet, 2019', value: 'te_klap' },
    { description: 'Teini-ikäisten lasten taloudet, 2019', value: 'te_teini' },
    { description: 'Yhden vanhemman lapsitaloudet, 2019', value: 'te_yhlap' },
    { description: 'Aikuisten taloudet, 2019', value: 'te_aik' },
    { description: 'Eläkeläisten taloudet, 2019', value: 'te_elak' },
    {
      description: 'Omistusasunnoissa asuvat taloudet, 2019',
      value: 'te_omis_as',
    },
    {
      description: 'Vuokra-asunnoissa asuvat taloudet, 2019',
      value: 'te_vuok_as',
    },
    {
      description: 'Muissa asunnoissa asuvat taloudet, 2019',
      value: 'te_muu_as',
    },
    { description: 'Taloudet yhteensä, 2019', value: 'tr_kuty' },
    { description: 'Talouksien keskitulot, 2019', value: 'tr_ktu' },
    { description: 'Talouksien mediaanitulot, 2019', value: 'tr_mtu' },
    {
      description: 'Alimpaan tuloluokkaan kuuluvat taloudet, 2019',
      value: 'tr_pi_tul',
    },
    {
      description: 'Keskimmäiseen tuloluokkaan kuuluvat taloudet, 2019',
      value: 'tr_ke_tul',
    },
    {
      description: 'Ylimpään tuloluokkaan kuuluvat taloudet, 2019',
      value: 'tr_hy_tul',
    },
    { description: 'Talouksien ostovoimakertymä, 2019', value: 'tr_ovy' },
    { description: 'Kesämökit yhteensä, 2019', value: 'ra_ke' },
    { description: 'Rakennukset yhteensä, 2019', value: 'ra_raky' },
    { description: 'Muut rakennukset yhteensä, 2019', value: 'ra_muut' },
    { description: 'Asuinrakennukset yhteensä, 2019', value: 'ra_asrak' },
    { description: 'Asunnot, 2019', value: 'ra_asunn' },
    { description: 'Asuntojen keskipinta-ala, 2019', value: 'ra_as_kpa' },
    { description: 'Pientaloasunnot, 2019', value: 'ra_pt_as' },
    { description: 'Kerrostaloasunnot, 2019', value: 'ra_kt_as' },
    { description: 'Työpaikat yhteensä, 2018', value: 'tp_tyopy' },
    { description: 'Alkutuotannon työpaikat, 2018', value: 'tp_alku_a' },
    { description: 'Jalostuksen työpaikat, 2018', value: 'tp_jalo_bf' },
    { description: 'Palveluiden työpaikat, 2018', value: 'tp_palv_gu' },
    {
      description: 'A Maatalous, metsätalous ja kalatalous, 2018',
      value: 'tp_a_maat',
    },
    { description: 'B Kaivostoiminta ja louhinta, 2018', value: 'tp_b_kaiv' },
    { description: 'C Teollisuus, 2018', value: 'tp_c_teol' },
    {
      description:
        'D Sähkö-, kaasu- ja lämpöhuolto, jäähdytysliiketoiminta, 2018',
      value: 'tp_d_ener',
    },
    {
      description:
        'E Vesihuolto, viemäri- ja jätevesihuolto ja muu ympäristön puhtaanapito, 2018',
      value: 'tp_e_vesi',
    },
    { description: 'F Rakentaminen, 2018', value: 'tp_f_rake' },
    {
      description:
        'G Tukku- ja vähittäiskauppa; moottoriajoneuvojen ja moottoripyörien korjaus, 2018',
      value: 'tp_g_kaup',
    },
    { description: 'H Kuljetus ja varastointi, 2018', value: 'tp_h_kulj' },
    {
      description: 'I Majoitus- ja ravitsemistoiminta, 2018',
      value: 'tp_i_majo',
    },
    { description: 'J Informaatio ja viestintä, 2018', value: 'tp_j_info' },
    {
      description: 'K Rahoitus- ja vakuutustoiminta, 2018',
      value: 'tp_k_raho',
    },
    { description: 'L Kiinteistöalan toiminta, 2018', value: 'tp_l_kiin' },
    {
      description: 'M Ammatillinen, tieteellinen ja tekninen toiminta, 2018',
      value: 'tp_m_erik',
    },
    {
      description: 'N Hallinto- ja tukipalvelutoiminta, 2018',
      value: 'tp_n_hall',
    },
    {
      description:
        'O Julkinen hallinto ja maanpuolustus; pakollinen sosiaalivakuutus, 2018',
      value: 'tp_o_julk',
    },
    { description: 'P Koulutus, 2018', value: 'tp_p_koul' },
    { description: 'Q Terveys- ja sosiaalipalvelut, 2018', value: 'tp_q_terv' },
    {
      description: 'R Taiteet, viihde ja virkistys, 2018 ',
      value: 'tp_r_taid',
    },
    { description: 'S Muu palvelutoiminta, 2018', value: 'tp_s_muup' },
    {
      description:
        'T Kotitalouksien toiminta työnantajina; kotitalouksien eriyttämätön toiminta tavaroiden ja palveluiden tuottamiseksi omaan käyttöön, 2018',
      value: 'tp_t_koti',
    },
    {
      description:
        'U Kansainvälisten organisaatioiden ja toimielinten toiminta, 2018',
      value: 'tp_u_kans',
    },
    { description: 'X Toimiala tuntematon, 2018', value: 'tp_x_tunt' },
    { description: 'Asukkaat yhteensä, 2018', value: 'pt_vakiy' },
    { description: 'Työlliset, 2018', value: 'pt_tyoll' },
    { description: 'Työttömät, 2018', value: 'pt_tyott' },
    { description: 'Lapset 0-14 -vuotiaat, 2018', value: 'pt_0_14' },
    { description: 'Opiskelijat, 2018', value: 'pt_opisk' },
    { description: 'Eläkeläiset, 2018', value: 'pt_elakel' },
    { description: 'Muut, 2018', value: 'pt_muut' },
  ];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Postinumero';
  yAxisLabel: string = 'Lukumäärä';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  checkoutForm = this.formBuilder.group({
    postnumber: '',
    myChoices: new FormArray([]),
  });

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {}

  setLists() {
    this.postNumbers = this.checkoutForm.value.postnumber.split(',');

    this.showConfig();
  }

  showConfig() {
    let body = {
      query: [
        {
          code: 'Postinumeroalue',
          selection: {
            filter: 'item',
            values: this.postNumbers,
          },
        },
        {
          code: 'Tiedot',
          selection: {
            filter: 'item',
            values: this.checkoutForm.get('myChoices').value,
          },
        },
      ],
      response: {
        format: 'json',
      },
    };

    let dataSet = [];
    this.postNumbers.forEach((city) => {
      dataSet.push({ name: city, series: [] });
    });

    this.apiService.getConfig(body).subscribe(
      (res) => {
        console.log(res);

        dataSet.forEach((city, cityIndex) => {
          res.data[cityIndex].values.forEach((element, elementIndex) => {
            city.name = res.data[cityIndex].key;
            city.series.push({
              name: res.columns[elementIndex + 1].text,
              value: element,
            });
          });
        });

        this.multi = dataSet;
      },
      (err) => {
        console.log('Fail');
      }
    );
  }

  onCheckChange(event) {
    const formArray: FormArray = this.checkoutForm.get(
      'myChoices'
    ) as FormArray;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    } else {
      /* unselected */
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }
}
