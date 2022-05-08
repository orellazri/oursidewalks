import renderer from "react-test-renderer";
import LoginScreen from "screens/LoginScreen";
import { render } from "../../node_modules/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod";

beforeAll(done => {
    done()
})

afterAll(done => {
    done()
})

describe("Login Screen (Negative Testing)",() => {

    it("renders correctly", () => {
        const tree = renderer.create(<LoginScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("fails when all input fields are empty",() => {
        const email = "";
        const password = "";
    });

    it("fails when Email field is empty", () => {
        const email = "";
        const password = "a";
    });

    it("fails when Password field is empty", () => {
        const email = "a";
        const password = "";
    });

    it("fails when Email and Password don't match a registered user", () => {
        const email = "a";
        const password = "a";
    });
})
