export class UserData{
     // User business
  name: string;
  lastName: string;
  lastNameSecondary: string;
  gender: number;
  birthDate: string;
  hasSocialMedia: boolean;
  hasVehicle: boolean;

  // SOCIAL MEDIA
  socialMedia: socialMedia[];

  // SESSION DATA
  idCuenta : number;
  userName: string;
  password: string;
  email: string;
  photo: string;

  // Data business
  bussinessName: string;
  bussinessType: string;
  cellphone: string;
  street: string;
  betweenStreets: string;
  description: string;
  neighborhood: string;
  city: string;
  municipality: string;
  idState: number = 0;
  country: string = "MX";
  zipCode: string;
  no: number;
  homeService: boolean;

  // Data vehicle
  vehicleType: number;
  descriptionVehicle : string;
  //brand: string;
  //model: string;
  //plate: string;
  //color: string;
  //year: number;
    
}

export class socialMedia {
    idUserSocialMedia : string;
    idSocialMedia : number;
    socialMediaUserName : string;
    socialMediaName : string;
    isActive : boolean;
    socialMediaURL : string;
}

export class ValidateUser{
    //user business
    username : boolean;
    name : boolean;
    lastName : boolean;
    lastNameSecondary : boolean;
    gender : boolean;
    photo : boolean;
    birthDate : boolean;
    //data business
    bussinessName : boolean;
    bussinessType : boolean;
    street : boolean;
    neighborhood : boolean;
    city: boolean;
    state : boolean;
    country : boolean;
    zipCode : boolean;
    no: boolean;
    description : boolean;
    //data vehicle
    hasVehicle : boolean
    vehicleType : boolean;
    cellphone : boolean;
    socialMedia : boolean
    email: boolean;
    password : boolean;
    municipality : boolean;
    betweenStreets : boolean;
}


