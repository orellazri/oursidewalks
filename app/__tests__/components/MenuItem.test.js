import renderer from "react-test-renderer";

import MenuItem from "components/MenuItem";

describe("<MenuItem />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<MenuItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});