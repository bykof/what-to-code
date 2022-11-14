import Router from "next/router";
import Layout from "../components/Layout";
import { useState, useEffect, useRef, useCallback } from "react";
import { createIdea } from "../apiClient";
import { RECENT } from "../components/IdeaOrder";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

export default () => {
  const [token, setToken] = useState();
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [tagsInputError, setTagsInputError] = useState(null);
  const [titleInput, setTitleInput] = useState("");
  const [titleInputError, setTitleInputError] = useState(null);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const tagInputElement = useRef(null);
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const onVerify = useCallback((token) => {
    setToken(token);
  }, []);
  
  const removeTag = (key) => {
    const index = tags.findIndex((tag) => tag === key);
    console.log(index);
    if (index < 0) {
      return;
    }
    const copy = [...tags];
    copy.splice(index, 1);
    setTags(copy);
    setTagsInputError(null);
  };

  const addTag = (value) => {
    setTags([...new Set([...tags, value])]);
    setTagInput("");
  };

  const onTagInput = (event) => {
    const value = event.target.value;
    const regex = /([\w]+)[\W]+/gm;
    const regexMatches = value.matchAll(regex);
    const matches = [];

    for (const regexMatch of regexMatches) {
      matches.push(regexMatch[1]);
    }

    if (tags.length >= 6) {
      setTagsInputError("Only six tags are allowed!");
      return;
    }
    setTagsInputError(null);

    if (matches.length !== 0) {
      addTag(matches[0]);
    } else {
      setTagInput(value);
    }
  };

  const onTagKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (tags.length >= 6) {
        setTagsInputError("Only six tags are allowed!");
        return;
      }
      setTagsInputError(null);
      addTag(tagInputElement.current.value);
    }
  };

  const onSubmit = async (event) => {
    console.log(event);

    event.preventDefault();

    if (titleInput === "") {
      setTitleInputError("Please fill out this field.");
      return;
    }

    setIsCreating(true);
    setError(null);
    try {
      let response = await createIdea({
        captchaToken: token,
        title: titleInput,
        description: descriptionInput,
        tags,
      });
      Router.push({ pathname: "/", query: { order: RECENT } });
    } catch (error) {
      console.error(error);
      setError("There was an error, please check the input fields!");
    } finally {
      setIsCreating(false);
    }
    
    setRefreshReCaptcha(r => !r);
  };

  useEffect(() => {
    if (titleInput !== "") {
      setTitleInputError(null);
    }
  }, [titleInput]);

  let renderedError;
  if (error) {
    renderedError = (
      <div className="notification is-danger">
        <button
          className="delete"
          onClick={() => {
            setError(null);
          }}
        ></button>
        {error}
      </div>
    );
  }

  return (
    <Layout>
      <div className="columns">
        <div className="column is-offset-one-quarter is-half">
          <form onSubmit={onSubmit}>
            <fieldset>
              <legend className="is-size-3">
                Tell the world What to Code!
              </legend>
              <hr />
              {renderedError}
              <div className="field">
                <label className="label" htmlFor="title">
                  Title (max. 100)
                </label>
                <div className="control">
                  <input
                    onChange={(event) => setTitleInput(event.target.value)}
                    value={titleInput}
                    maxLength="100"
                    id="title"
                    className="input"
                    type="text"
                    placeholder="A small step for a human but a big step for mankind"
                  />
                </div>
              </div>
              {titleInputError ? (
                <p className="help is-danger">{titleInputError}</p>
              ) : null}
              <div className="field">
                <label className="label" htmlFor="description">
                  Description (max. 1000, optional)
                </label>
                <div className="control">
                  <textarea
                    onChange={(event) =>
                      setDescriptionInput(event.target.value)
                    }
                    value={descriptionInput}
                    id="description"
                    className="textarea"
                    placeholder="..."
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="tags">
                  Tags (max. 6, optional)
                </label>
                <div className="control">
                  <input
                    ref={tagInputElement}
                    onKeyPress={onTagKeyPress}
                    onChange={onTagInput}
                    value={tagInput}
                    type="text"
                    id="tags"
                    className="input"
                  />
                </div>
                {tagsInputError ? (
                  <p className="help is-danger">{tagsInputError}</p>
                ) : null}
                <br />
                <div className="tags">
                  {tags.map((tag) => (
                    <span key={tag} className="tag is-primary">
                      {tag}{" "}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="delete is-small"
                      ></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="field">
                <GoogleReCaptcha
                  onVerify={onVerify}
                  refreshReCaptcha={refreshReCaptcha}
                />
              </div>
              <div className="field">
                <div className="control has-text-right">
                  <button
                    type="submit"
                    className="button is-primary"
                    disabled={isCreating}
                  >
                    {isCreating ? "Loading" : "Submit"}
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </Layout>
  );
};
