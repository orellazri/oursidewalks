import renderer from "react-test-renderer";
import RegisterScreen from "screens/RegisterScreen";
import { render } from "../../node_modules/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod";

beforeAll(done => {
    done()
})

afterAll(done => {
    done()
})

describe("Sign-Up Screen (Negative Testing)",() => {

    it("renders correctly", () => {
        const tree = renderer.create(<RegisterScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("fails when all input fields are empty",() => {
        const name = "";
        const phone = "";
        const email = "";
        const password = "";
    });

    // Check with requirements if there are any restrictions on password
    it("fails when Email field is empty", () => {
        const name = "גל";
        const phone = "";
        const email = "";
        const password = "123";
    });

    it("fails when Phone and Email are invalid by chars ", () => {
        const name = "גל גדות";
        const phone = "abc";
        const email = "055";
        const password = "@123";
    });

    it("fails when Phone and Email are invalid by length (too short)", () => {
        const name = "גל גדות";
        const phone = "055";
        const email = "gaga";
        const password = "a123";
    });

    it("fails when Phone and Email are invalid by length (too long) and no password", () => {
        const name = "גל גדות";
        const phone = "05512345678";
        const email = "gaga@something.com";
        const password = "a@1234";
    });
})
