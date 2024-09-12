function toggleArchive(month) {
    var archiveList = document.getElementById('archive-' + month);
    if (archiveList) {
        if (archiveList.classList.contains('hidden')) {
            archiveList.classList.remove('hidden');
        } else {
            archiveList.classList.add('hidden');
        }
    }
}