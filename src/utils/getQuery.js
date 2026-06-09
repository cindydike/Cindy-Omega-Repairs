import {
  collection,
  query,
  limit,
  where,
  startAfter,
} from "firebase/firestore";

const getQuery = (start, count, arr, collectionName, field, db) => {
  let length = arr.length;
  const collectionRef = collection(db, collectionName);
  if (length == 1 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }
  if (length == 1 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      limit(count)
    );
    return q;
  }
  if (length == 1) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      limit(10)
    );
    return q;
  }
  if (length == 2 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }
  if (length == 2 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      limit(count)
    );
    return q;
  }
  if (length == 2) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 3 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      startAfter(start),

      limit(count)
    );
    return q;
  }
  if (length == 3 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      limit(count)
    );
    return q;
  }
  if (length == 3) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 4 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      startAfter(start),

      limit(count)
    );
    return q;
  }
  if (length == 4 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      limit(count)
    );
    return q;
  }
  if (length == 4) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 5 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      startAfter(start),

      limit(count)
    );
    return q;
  }
  if (length == 5 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      limit(count)
    );
    return q;
  }
  if (length == 5) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 6 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      startAfter(start),

      limit(count)
    );
    return q;
  }
  if (length == 6 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      limit(count)
    );
    return q;
  }
  if (length == 6) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 7 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      startAfter(start),

      limit(count)
    );
    return q;
  }
  if (length == 7 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      limit(count)
    );
    return q;
  }
  if (length == 7) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 8 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      startAfter(start),

      limit(count)
    );
    return q;
  }

  if (length == 8 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      limit(count)
    );
    return q;
  }
  if (length == 8) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      limit(10)
    );
    return q;
  }
  if (length == 8) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 9 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      startAfter(start),

      limit(count)
    );
    return q;
  }
  if (length == 9 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      limit(count)
    );
    return q;
  }
  if (length == 9) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 10 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      startAfter(start),

      limit(count)
    );
    return q;
  }
  if (length == 10 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      limit(count)
    );
    return q;
  }
  if (length == 10) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 11 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      startAfter(start),

      limit(count)
    );
    return q;
  }

  if (length == 11 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 11) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 12 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      startAfter(start),

      limit(count)
    );
    return q;
  }
  if (length == 12 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      limit(count)
    );
    return q;
  }
  if (length == 12) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 13 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      startAfter(start),

      limit(count)
    );
    return q;
  }

  if (length == 13 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 13) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 14 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 14 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 14) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 15 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 15 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 15) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 16 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 16 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 16) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 17 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 17 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 17) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 18 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 18 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 18) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 19 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }
  if (length == 19 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      limit(count)
    );
    return q;
  }
  if (length == 19) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 20 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 20 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 20) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 21 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }
  if (length == 21 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      limit(count)
    );
    return q;
  }
  if (length == 21) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 22 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 22 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),

      limit(count)
    );
    return q;
  }

  if (length == 22) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),

      limit(10)
    );
    return q;
  }

  if (length == 23 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 23 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 23) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 24 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 24 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 24) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 25 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 25 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 25) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 26 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 26 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 26) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 27 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 27 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 27) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 28 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 28 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 28) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 29 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 29 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 29) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 30 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 30 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 30) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 31 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 31 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 31) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 32 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      where(`${field}.${arr[31]}`, "==", true),
      startAfter(start),
      limit(count)
    );
    return q;
  }

  if (length == 32 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      where(`${field}.${arr[31]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 32) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      where(`${field}.${arr[31]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 33 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      where(`${field}.${arr[31]}`, "==", true),
      where(`${field}.${arr[32]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 33 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      where(`${field}.${arr[31]}`, "==", true),
      where(`${field}.${arr[32]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 33) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      where(`${field}.${arr[31]}`, "==", true),
      where(`${field}.${arr[32]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 34 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      where(`${field}.${arr[31]}`, "==", true),
      where(`${field}.${arr[32]}`, "==", true),
      where(`${field}.${arr[33]}`, "==", true),
      limit(count)
    );
    return q;
  }
  if (length == 34 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      where(`${field}.${arr[31]}`, "==", true),
      where(`${field}.${arr[32]}`, "==", true),
      where(`${field}.${arr[33]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 34) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      where(`${field}.${arr[31]}`, "==", true),
      where(`${field}.${arr[32]}`, "==", true),
      where(`${field}.${arr[33]}`, "==", true),
      limit(10)
    );
    return q;
  }

  if (length == 35 && start && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      where(`${field}.${arr[31]}`, "==", true),
      where(`${field}.${arr[32]}`, "==", true),
      where(`${field}.${arr[33]}`, "==", true),
      where(`${field}.${arr[34]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 35 && count) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      where(`${field}.${arr[31]}`, "==", true),
      where(`${field}.${arr[32]}`, "==", true),
      where(`${field}.${arr[33]}`, "==", true),
      where(`${field}.${arr[34]}`, "==", true),
      limit(count)
    );
    return q;
  }

  if (length == 35) {
    let q = query(
      collectionRef,
      where(`${field}.${arr[0]}`, "==", true),
      where(`${field}.${arr[1]}`, "==", true),
      where(`${field}.${arr[2]}`, "==", true),
      where(`${field}.${arr[3]}`, "==", true),
      where(`${field}.${arr[4]}`, "==", true),
      where(`${field}.${arr[5]}`, "==", true),
      where(`${field}.${arr[6]}`, "==", true),
      where(`${field}.${arr[7]}`, "==", true),
      where(`${field}.${arr[8]}`, "==", true),
      where(`${field}.${arr[9]}`, "==", true),
      where(`${field}.${arr[10]}`, "==", true),
      where(`${field}.${arr[11]}`, "==", true),
      where(`${field}.${arr[12]}`, "==", true),
      where(`${field}.${arr[13]}`, "==", true),
      where(`${field}.${arr[14]}`, "==", true),
      where(`${field}.${arr[15]}`, "==", true),
      where(`${field}.${arr[16]}`, "==", true),
      where(`${field}.${arr[17]}`, "==", true),
      where(`${field}.${arr[18]}`, "==", true),
      where(`${field}.${arr[19]}`, "==", true),
      where(`${field}.${arr[20]}`, "==", true),
      where(`${field}.${arr[21]}`, "==", true),
      where(`${field}.${arr[22]}`, "==", true),
      where(`${field}.${arr[23]}`, "==", true),
      where(`${field}.${arr[24]}`, "==", true),
      where(`${field}.${arr[25]}`, "==", true),
      where(`${field}.${arr[26]}`, "==", true),
      where(`${field}.${arr[27]}`, "==", true),
      where(`${field}.${arr[28]}`, "==", true),
      where(`${field}.${arr[29]}`, "==", true),
      where(`${field}.${arr[30]}`, "==", true),
      where(`${field}.${arr[31]}`, "==", true),
      where(`${field}.${arr[32]}`, "==", true),
      where(`${field}.${arr[33]}`, "==", true),
      where(`${field}.${arr[34]}`, "==", true),
      limit(10)
    );
    return q;
  }

  return null;
};

export default getQuery;
