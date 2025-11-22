
// Observe o código abaixo e faça as alterações necessárias para que ele passe a respeitar o Princípio do Aberto/Fechado (OCP).

interface Notify {
    status(): void
}

class Email implements Notify {
   
    constructor(public message: string) {
        this.message = message
    }

    status(): void {
        console.log("Email", this.message);
    }

}class Phone implements Notify {
   
    constructor(public message: string) {
        this.message = message
    }

    status(): void {
        console.log("Phone", this.message);
    }

}class Console implements Notify {
   
    constructor(public message: string) {
        this.message = message
    }

    status(): void {
        console.log("Console", this.message);
    }

}

export default function progressNotification(object: Notify): void {
    return object.status()
  }

  const email = new Email('hello world')
  const phone = new Phone('hello world')
  const consol = new Console('hello world')

progressNotification(email)
progressNotification(phone)
progressNotification(consol)