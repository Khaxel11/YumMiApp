import { UserData, socialMedia } from "./user";

//

class UserDataBuilder {
    private userData: UserData;

    constructor() {
        this.userData = new UserData();
    }

    setUsername(username: string): UserDataBuilder {
        this.userData.userName = username;
        return this;
    }

    setName(name: string): UserDataBuilder {
        this.userData.name = name;
        return this;
    }

    setLastName(lastName: string): UserDataBuilder {
        this.userData.lastName = lastName;
        return this;
    }

    setLastNameSecondary(lastNameSecondary: string): UserDataBuilder {
        this.userData.lastNameSecondary = lastNameSecondary;
        return this;
    }

    setGender(gender: number): UserDataBuilder {
        this.userData.gender = gender;
        return this;
    }

    setPhoto(photo: string): UserDataBuilder {
        this.userData.photo = photo;
        return this;
    }

    setBirthDate(birthDate: string): UserDataBuilder {
        this.userData.birthDate = birthDate;
        return this;
    }

    setBussinessName(bussinessName: string): UserDataBuilder {
        this.userData.bussinessName = bussinessName;
        return this;
    }

    setBussinessType(bussinessType: any): UserDataBuilder {
        this.userData.bussinessType = bussinessType;
        return this;
    }

    setStreet(street: string): UserDataBuilder {
        this.userData.street = street;
        return this;
    }

    setNeighborhood(neighborhood: string): UserDataBuilder {
        this.userData.neighborhood = neighborhood;
        return this;
    }

    setCity(city: string): UserDataBuilder {
        this.userData.city = city;
        return this;
    }

    setState(state: number): UserDataBuilder {
        this.userData.idState = state;
        return this;
    }

    setCountry(country: string): UserDataBuilder {
        this.userData.country = country;
        return this;
    }

    setZipCode(zipCode: string): UserDataBuilder {
        this.userData.zipCode = zipCode;
        return this;
    }

    setNo(no: number): UserDataBuilder {
        this.userData.no = no;
        return this;
    }

    setDescription(description: string): UserDataBuilder {
        this.userData.description = description;
        return this;
    }

    setHasVehicle(hasVehicle: boolean): UserDataBuilder {
        this.userData.hasVehicle = hasVehicle;
        return this;
    }

    setVehicleType(vehicleType: number): UserDataBuilder {
        this.userData.vehicleType = vehicleType;
        return this;
    }

    setCellphone(cellphone: string): UserDataBuilder {
        this.userData.cellphone = cellphone;
        return this;
    }

    setSocialMedia(socialMedia: socialMedia[]): UserDataBuilder {
        this.userData.socialMedia = socialMedia;
        return this;
    }

    build(): UserData {
        return this.userData;
    }
}
