import renderer from "react-test-renderer";

import Logo from "components/Logo";

describe("<Logo />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Logo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
