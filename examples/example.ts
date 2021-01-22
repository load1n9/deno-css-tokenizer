import { CSS } from "../mod.ts"

let test:any = Deno.readTextFile("./test.css");

test.then((response:string) => {
    console.log(new CSS(response).init())
});

