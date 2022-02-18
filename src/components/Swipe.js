import React, { useState, useMemo, useRef } from "react";
import { getPotentialMatchesByUserId } from "../services/dogs";
import jwtDecode from "jwt-decode";
import TinderCard from "react-tinder-card";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
  BsArrowCounterclockwise,
} from "react-icons/bs";

const fghfhg = [
  {
    id: 24,
    surname: "aaa",
    firstname: "AAAghhfgh",
    created_at: "2022-02-17T09:09:19.120Z",
    email: "aaa",
    bio: "Hei hei",
    img_url: null,
    sex: "male",
    breed: null,
    age: null,
    password: "aaa",
  },
  {
    id: 25,
    surname: "aa",
    firstname: "aa",
    created_at: "2022-02-17T09:10:00.207Z",
    email: "aa",
    bio: "TEST",
    img_url: null,
    sex: "male",
    breed: null,
    age: null,
    password: "aa",
  },
];

function Swipe(props) {
  const db = props.matches;
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();

  console.log(db);

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  if (!db.length) {
    return null;
  }

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (id, idx) => {
    console.log(`${id} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div>
      <div className="cardContainer">
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.id.toString()}
            onSwipe={(dir) => swiped(dir, character.id, index)}
            onCardLeftScreen={() => outOfFrame(character.id, index)}
          >
            <div className="card">
              <img src={character.img_url} alt="User image" />
              <div className="card-name">
                <strong>
                  <p>
                    {character.firstname} {character.surname}, {character.age}
                  </p>
                </strong>
              </div>
              <div className="card-info">
                <p>
                  {!character.bio ? "User has no bio." : character.bio}
                </p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <button onClick={() => swipe("left")}>
          <BsFillHandThumbsDownFill />
        </button>
        <button onClick={() => goBack()}>
          <BsArrowCounterclockwise />
        </button>
        <button onClick={() => swipe("right")}>
          <BsFillHandThumbsUpFill />
        </button>
      </div>
    </div>
  );
}

export default Swipe;
