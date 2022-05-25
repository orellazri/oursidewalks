import renderer from "react-test-renderer";

import Title from "components/Title";

describe("<Title />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Title />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});