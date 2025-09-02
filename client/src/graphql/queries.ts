import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
      role
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export const EARTHQUAKES_QUERY = gql`
  query Earthquakes(
    $startTime: String
    $endTime: String
    $minMagnitude: Float
    $maxMagnitude: Float
    $limit: Int
  ) {
    earthquakes(
      startTime: $startTime
      endTime: $endTime
      minMagnitude: $minMagnitude
      maxMagnitude: $maxMagnitude
      limit: $limit
    ) {
      type
      metadata {
        generated
        url
        title
        status
        api
        count
      }
      features {
        id
        magnitude
        place
        time
        updated
        tz
        url
        detail
        felt
        cdi
        mmi
        alert
        status
        tsunami
        sig
        net
        code
        ids
        sources
        types
        nst
        dmin
        rms
        gap
        magType
        type
        title
        geometry {
          type
          coordinates
        }
        properties {
          mag
          place
          time
          updated
          tz
          url
          detail
          felt
          cdi
          mmi
          alert
          status
          tsunami
          sig
          net
          code
          ids
          sources
          types
          nst
          dmin
          rms
          gap
          magType
          type
          title
        }
      }
      bbox
    }
  }
`;
