const STORAGE_PROFILE = "ProfileData";

export function getProfileDataFromStorage () {
    if (typeof window === "undefined") return {};
    const data = localStorage.getItem(STORAGE_PROFILE);
    return data ? JSON.parse(data) : {};
}

export function updateProfileDataStorage(_:undefined, formData: FormData) : void {
    console.log(formData);
    localStorage.setItem(STORAGE_PROFILE, JSON.stringify(formData));
}