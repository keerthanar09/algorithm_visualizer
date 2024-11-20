function ClickList() {
  return (
    <div class="list-group">
      <a
        href="/bubble"
        class="list-group-item list-group-item-action active"
        aria-current="true"
      >
        Bubble Sort
      </a>
      <a href="/merge" class="list-group-item list-group-item-action">
        Merge Sort
      </a>
      <a href="/quick" class="list-group-item list-group-item-action">
        Quick Sort
      </a>
      <a href="/select" class="list-group-item list-group-item-action">
        Selection Sort
      </a>
    </div>
  );
}
export default ClickList;
