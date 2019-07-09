declare var M;

export class MaterialService {
  static toast(message: string) {
    console.log("toast");
    M.toast({html: message});
  }
}
