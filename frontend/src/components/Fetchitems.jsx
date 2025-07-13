// src/components/FetchItems.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// --- thunk creator ----------------------------------------------------------
const fetchItems = (signal) => async (dispatch) => {
  try {
    dispatch(fetchStatusActions.markFetchingStarted());

    const res   = await fetch(`${API_BASE}/items`, { signal });
    const data  = await res.json();            //  { items: [...] }
    const item  = data.items?.[0];             //  first item

    dispatch(itemsActions.addInitialItems(item));
    dispatch(fetchStatusActions.markFetchDone());
  } catch (err) {
    if (err.name !== "AbortError") console.error(err);
  } finally {
    dispatch(fetchStatusActions.markFetchingFinished());
  }
};
// ---------------------------------------------------------------------------

const FetchItems = () => {
  const { fetchDone } = useSelector((state) => state.fetchStatus);
  const dispatch      = useDispatch();

  useEffect(() => {
    if (fetchDone) return;                     // already fetched once

    const controller = new AbortController();

    dispatch(fetchItems(controller.signal));   // <-- actually dispatch it

    return () => controller.abort();           // cleanup on unmount
  }, [dispatch, fetchDone]);

  return null;                                 // nothing to render
};

export default FetchItems;
