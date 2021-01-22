export class CSS {
    data: any[];
    output: any;
    current: string;
    position: number = 0;
    public constructor(data: string) {
        this.data = data
            .replace(/\r?\n|\r/g, "")
            .split("")
            .filter(item => item)
        this.current = ""
        this.output = {}
        this.init()
    }
    public init() {
        while (this.position < this.data.length) {
            this.current = this.TokenizeElement(this.CreateElement())
            this.output[this.current] = this.TokenizeProps(this.CreateProps())
        }
        try {
            delete this.output[""]
        } catch (e) {
            return
        }
        return this.output
    }
    private CreateElement() {
        let output: string = ""
        while (!["{"].includes(this.data[this.position]) && this.position < this.data.length) {
            output += this.data[this.position]
            this.position++
        }
        this.position++
        return output
    }
    private CreateProps() {
        let element: string = ""
        while (!["{", "}"].includes(this.data[this.position]) && this.position < this.data.length) {
            element += this.data[this.position]
            this.position++

        }
        return element
    }

    private TokenizeProps(element: string) {
        let data: any[] = element
            .replace(/\r?\n|\r/g, "")
            .replace(/\s+/g, '')
            .split(";")
            .filter(item => item)
        for (let i = 0; i < data.length; i++) {
            let temp: any = data[i].split(":")
            let name: string = temp.splice(0, 1)
            data[i] = {}
            data[i][name] = temp
        }
        return data
    }
    private TokenizeElement(element: string) {
        let data: string = element
            .replace(/\r?\n|\r/g, "")
            .replace("}", "")
            .replace("{", "")
            .trim()
        return data
    }
}