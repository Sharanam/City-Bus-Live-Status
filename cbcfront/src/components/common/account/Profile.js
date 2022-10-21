import { useCallback, useEffect, useState } from "react";
import userModel from "../../../globalState/user";
import { Label, Input, Form, Button } from "../lib/formElements/Index";
import { Container } from "../lib/layout/Index";
import { Card } from "../lib/styledElements/Index";

const Profile = ({ user, card }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchProfile = useCallback(() => {
    setIsLoading(true);
    userModel.getMyProfile().then((result) => {
      setIsLoading(false);
      setData({ ...result });
    });
  }, []);
  const fetchProfileOf = useCallback(() => {
    setIsLoading(true);
    userModel.getProfileOf(user).then((result) => {
      setIsLoading(false);
      setData({ ...result });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (user) {
      fetchProfileOf(user);
      return;
    }
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) return <h3>Loading...</h3>;
  if (card || user) {
    return (
      <Container size="sm">
        <Card
          style={{
            color: "var(--dark-blue)",
            backgroundColor: "var(--white)",
          }}
        >
          <h2>
            {data.name}
            <span style={{ fontSize: "0.5em", marginLeft: "2pt" }}>
              {data.public ? "Public" : "Private"}
            </span>
          </h2>
          <p>{data.bio}</p>
          <p>{data.social}</p>
        </Card>
      </Container>
    );
  }
  return (
    <Container size="sm">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          userModel.updateMyProfile(data);
        }}
      >
        {{
          title: "Edit Profile",
          formFields: (
            <>
              <Label
                style={{
                  textTransform: "capitalize",
                }}
                className="required"
              >
                Name
              </Label>
              <Input
                type="text"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
              />
              <Label
                style={{
                  textTransform: "capitalize",
                }}
              >
                bio
              </Label>
              <Input
                type="text"
                value={data.bio}
                onChange={(e) => {
                  setData({ ...data, bio: e.target.value });
                }}
              />
              <Label
                style={{
                  textTransform: "capitalize",
                }}
              >
                social
              </Label>
              <Input
                type="text"
                value={data.social}
                onChange={(e) => {
                  setData({ ...data, social: e.target.value });
                }}
              />
              <span>
                <Label
                  style={{
                    textTransform: "capitalize",
                  }}
                  htmlFor="public"
                >
                  private:
                </Label>
                <Input
                  type="checkbox"
                  style={{
                    margin: "0 0.5em",
                  }}
                  name="public"
                  checked={!data.public}
                  onChange={(e) => {
                    setData({ ...data, public: !data.public });
                  }}
                />
              </span>
              <Label
                style={{
                  textTransform: "capitalize",
                }}
              >
                phone
              </Label>
              <Input
                type="text"
                style={{
                  backgroundColor: "var(--google-gray-700)",
                  color: "var(--white)",
                }}
                value={data.phone}
                readOnly
                // onChange={(e) => {
                //   setData({ ...data, phone: e.target.value });
                // }}
              />
              <Label
                style={{
                  textTransform: "capitalize",
                }}
              >
                email
              </Label>
              <Input
                type="email"
                style={{
                  backgroundColor: "var(--google-gray-700)",
                  color: "var(--white)",
                }}
                value={data.email}
                readOnly
                // onChange={(e) => {
                //   setData({ ...data, email: e.target.value });
                // }}
              />
              <p
                style={{
                  textAlign: "center",
                  color: data.isVerified ? "currentColor" : "var(--danger)",
                }}
              >
                You Have {data.isVerified ? "Verified" : "Not Verified"} Your
                Email Id.
              </p>
            </>
          ),
          buttons: (
            <>
              <Button className="positive">Update Profile</Button>
            </>
          ),
        }}
      </Form>
    </Container>
  );
};
export default Profile;
