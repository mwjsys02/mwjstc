import gql from 'graphql-tag';

export const GetQuery1 = gql`
query get_goods {
  tblgoods(order_by: {gcode: asc}) {
    gcode
    gname
    sukbn
  }
}`;
export const GetQuery2 = gql`
query get_store {
  tblstore {
    scode
    sname
  }
}`;

export const GetQuery3 = gql`
query get_stock($gcode: String!,$scode: String!)  {
  tblstock(where: {gcode: {_eq:$gcode}, storeid: {_eq:$scode}}) {
    htzan
    juzan
    stock
    sct01
    sct02
    sct03
    sct04
    sct05
    sct06
    sct07
    sct08
    sct09
    sct10
    sct11
    sct12
    ndate
    incnt
    gcode
    storeid
    created_at
    sch01
    sch02
    sch03
    sch04
    sch05
    sch06
    sch07
    sch08
    sch09
    sch10
    sch11
    sch12
    tbltrans {
      gcode
      sday
      ttype
      denno
      mline
      suu
      biko
      tcode
      denku
      yday
      aitec
      aiten
    }
  }
}`;

export const GetQuery4 = gql`
query get_utwk($gcode: String!,$scode: String!)  {
  tblgczai(where: {gcode: {_eq:$gcode}, storeid: {_eq:$scode}}) {
    gcode
    irisu
    setgoods {
      gcode
      stock
      juzan
      htzan
      ndate
      incnt
    }
  }
  tblstock(where: {gcode: {_eq:$gcode}, storeid: {_eq:$scode}}) {
    sct01
    sct02
    sct03
    sct04
    sct05
    sct06
    sct07
    sct08
    sct09
    sct10
    sct11
    sct12
    created_at
    sch01
    sch02
    sch03
    sch04
    sch05
    sch06
    sch07
    sch08
    sch09
    sch10
    sch11
    sch12
  }
}`;

export const GetQuery5 = gql`
query get_allstc($gcode: [String!]!,$scode: String!)   {
  tblstock(where: {gcode: {_in:$gcode}, storeid: {_ilike:$scode}}) {
    gcode
    storeid
    htzan
    juzan
    stock
    sct01
    sct02
    sct03
    sct04
    sct05
    sct06
    sct07
    sct08
    sct09
    sct10
    sct11
    sct12
    sch01
    sch02
    sch03
    sch04
    sch05
    sch06
    sch07
    sch08
    sch09
    sch10
    sch11
    sch12
  }
}`;
export const GetQuery6 = gql`
query get_staff {
  tblstaff {
    tcode
    name
  }
}`;