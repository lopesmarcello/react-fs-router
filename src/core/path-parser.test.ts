import { PathParser } from "./path-parser";

describe("PathParser.fileToRoute", () => {
  it("should convert index.tsx to /", () => {
    expect(PathParser.fileToRoute("pages/index.tsx")).toBe("/");
  });

  it("should convert nested index.tsx to /nested", () => {
    expect(PathParser.fileToRoute("pages/nested/index.tsx")).toBe("/nested");
  });

  it("should convert basic file to /file", () => {
    expect(PathParser.fileToRoute("pages/file.tsx")).toBe("/file");
  });

  it("should convert nested file to /nested/file", () => {
    expect(PathParser.fileToRoute("pages/nested/file.tsx")).toBe("/nested/file");
  });

  it("should convert dynamic parameter [id].tsx to /:id", () => {
    expect(PathParser.fileToRoute("pages/[id].tsx")).toBe("/:id");
  });

  it("should convert nested dynamic parameter [id].tsx to /nested/:id", () => {
    expect(PathParser.fileToRoute("pages/nested/[id].tsx")).toBe("/nested/:id");
  });

  it("should convert catch-all [...slug].tsx to /*", () => {
    expect(PathParser.fileToRoute("pages/[...slug].tsx")).toBe("/*");
  });

  it("should convert optional catch-all [[...slug]].tsx to /*?", () => {
    expect(PathParser.fileToRoute("pages/[[...slug]].tsx")).toBe("/*?");
  });

  it("should remove route groups (group)/file.tsx to /file", () => {
    expect(PathParser.fileToRoute("pages/(group)/file.tsx")).toBe("/file");
  });

  it("should remove nested route groups (group)/nested/(subgroup)/file.tsx to /nested/file", () => {
    expect(PathParser.fileToRoute("pages/(group)/nested/(subgroup)/file.tsx")).toBe("/nested/file");
  });

  it("should handle mixed dynamic and static segments", () => {
    expect(PathParser.fileToRoute("pages/users/[id]/profile.tsx")).toBe("/users/:id/profile");
  });

  it("should handle complex route with all features", () => {
    expect(PathParser.fileToRoute("pages/(auth)/posts/[id]/comments/[[...commentId]].tsx")).toBe(
      "/posts/:id/comments/*?"
    );
  });
});
