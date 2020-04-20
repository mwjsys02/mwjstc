import gql from 'graphql-tag';

export const GetQuery1 = gql`
query get_goods {
  tblgoods {
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
    tbltrans {
      sday
      ttype
      suu
      denno
      mline
      biko
    }
  }
}`;