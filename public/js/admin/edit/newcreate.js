// Photos preview controller

const containerPhotosPreview = document.getElementById("containerPhotosPreview")
const inputProductPhotos = document.getElementById("inputProductPhotos")
let image_id = 1

inputProductPhotos.addEventListener("change", () => {
    const files = inputProductPhotos.files
    if (files && files.length) {
        while (containerPhotosPreview.firstChild) containerPhotosPreview.removeChild(containerPhotosPreview.firstChild)
        for (const file of files) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                containerPhotosPreview.insertAdjacentHTML("beforeend", `
                <img src="${e.srcElement.result}" alt="${file.name}" class="create-input-file-preview-img single" id="imgPreview${image_id++}">
                `)
            }
            fileReader.readAsDataURL(file)
        }
    }
})

// Editor dialog

function ElCreator(type, tag, params = null, textContent = "") {
    if (!(type === "paired" || type === "unpaired")) return "<></>"
    let formed_tag = ""
    formed_tag += `<${tag} `
    for (let property in params) {
        formed_tag += `${property}='${params[property]}' `
    }
    formed_tag += `>`
    if (type === "paired") {
        formed_tag += textContent
        formed_tag += `</${tag}>`
    }
    return formed_tag
}

// Sandbox dialog
const dialogSandboxEditorControls = `
<div class="controls">
    <button id="buttonSandboxEditorControlsBold" title="Полужирный" type="button"><img src="/img/icons/Bold.svg" alt="Bold"></button>
    <button id="buttonSandboxEditorControlsLink" title="Ссылка" type="button"><img src="/img/icons/LinkA.svg" alt="Ссылка"></button>
    <button id="buttonSandboxEditorControlsList" title="Ненумерованный список" type="button"><img src="/img/icons/List.svg" alt="Ненумерованный список"></button>
    <button id="buttonSandboxEditorControlsListNumbered" title="Нумерованный список" type="button"><img src="/img/icons/ListNumbered.svg" alt="Нумерованный список"></button>
    <button id="buttonSandboxEditorControlsHeader" title="Заголовок" type="button"><img src="/img/icons/Header.svg" alt="Заголовок"></button>
    <button id="buttonSandboxEditorControlsPicture" title="Изображение" type="button"><img src="/img/icons/Picture.svg" alt="Изображение"></button>
    <button id="buttonSandboxEditorControlsPictureWide" title="Широкий баннер" type="button"><img src="/img/icons/PictureWide.svg" alt="Широкий баннер"></button>
</div>
`

function scriptSandboxEditorControls(textareaId) {
    const buttonsSandboxEditorControls = [document.getElementById("buttonSandboxEditorControlsBold"), document.getElementById("buttonSandboxEditorControlsLink"), document.getElementById("buttonSandboxEditorControlsList"), document.getElementById("buttonSandboxEditorControlsListNumbered"), document.getElementById("buttonSandboxEditorControlsHeader"), document.getElementById("buttonSandboxEditorControlsPicture"), document.getElementById("buttonSandboxEditorControlsPictureWide")]
    const actionsSandboxEditorControls = {
        "Полужирный": `<b>Полужирный</b>`,
        "Ссылка": `<a href="ссылка">Текст ссылки</a>`,
        "Ненумерованный список": `<ul><li>Элемент 1</li><li>Элемент 2</li></ul>`,
        "Нумерованный список": `<ol><li>Элемент 1</li><li>Элемент 2</li></ol>`,
        "Заголовок": `<h3>Заголовок</h3>`,
        "Изображение": `<img src="ссылка">`,
        "Широкий баннер": `<img wide src="ссылка">`,
    }
    buttonsSandboxEditorControls.forEach(button => {
        button.addEventListener("click", () => {
            const textarea = document.getElementById(textareaId)
            const insertContent = actionsSandboxEditorControls[button.getAttribute("title")]

            const startPos = textarea.selectionStart
            const endPos = textarea.selectionEnd

            textarea.value = textarea.value.substring(0, startPos) + insertContent + textarea.value.substring(endPos);

            const newPos = startPos + insertContent.length;
            textarea.selectionStart = newPos;
            textarea.selectionEnd = newPos;

            textarea.focus();
        })
    })
}

let stringDescription = ""
let preDescription = document.getElementById("preDescription")
let pDescriptionEmpty = document.getElementById("pDescriptionEmpty")

const editor_content = {
    "Description": {
        "update": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Содержание новости"),
            dialogSandboxEditorControls,
            ElCreator("paired", "textarea", {
                id: "textareaDescription",
                placeholder: "Содержание",
                required: "true",
            }),
            ElCreator("paired", "button", {
                type: "button",
                id: "buttonDescription",
            }, "Задать"),
        ]
    },
}

function scriptSandboxEditorDescriptionCreate(buttonId, preId, textareaId, inputDescriptionId) {
    stringDescription = document.getElementById(preId).innerHTML
    document.getElementById(textareaId).value = stringDescription

    document.getElementById(textareaId).addEventListener("input", (event) => {
        if (textareaId === "textareaDescription") stringDescription = event.target.value
    })

    document.getElementById(buttonId).addEventListener("click", () => {
        if (stringDescription) {
            document.getElementById(preId).innerHTML = stringDescription
            document.getElementById(inputDescriptionId).value = stringDescription
            if (document.querySelector(".panel-content.hidden")) document.querySelector(".panel-content.hidden").style.display = "flex"
            pDescriptionEmpty.style.display = "none"
            dialogSandboxEditor.close()
        } else pDescriptionEmpty.style.display = "flex"
    })
}

// Sandbox dialog

const dialogSandboxEditor = document.getElementById("sandboxEditorDialog")
const dialogSandboxEditorForm = document.getElementById("sandboxFormEditor")

function SandboxInit(action, table, id = "") {
    while (dialogSandboxEditorForm.firstChild) {
        dialogSandboxEditorForm.removeChild(dialogSandboxEditorForm.firstChild)
    }
    for (let tag of editor_content[table][action]) {
        dialogSandboxEditorForm.insertAdjacentHTML('beforeend', tag)
    }
    scriptSandboxEditorControls(`textarea${table}`)
    scriptSandboxEditorDescriptionCreate(`button${table}`, `pre${table}`, `textarea${table}`, `input${table}`)
    dialogSandboxEditorForm.setAttribute("method", "post")
    dialogSandboxEditorForm.setAttribute("action", `table/${table}/${action}/${id}`)
    dialogSandboxEditor.show()
}

// Editor handler

const buttonDialogSandboxEditorClose = document.getElementById("SandboxEditorClose")

buttonDialogSandboxEditorClose.addEventListener("click", () => {
    dialogSandboxEditor.close()
})

const buttonsUpdateItems = document.querySelectorAll(".update-items")

buttonsUpdateItems.forEach(button => {
    button.addEventListener("click", () => {
        if (button.getAttribute("sandbox")) SandboxInit("update", button.getAttribute("table"), button.getAttribute("item-id"))
    })
})

// New delete

const buttonEditorOpenForDelete = document.getElementById("buttonEditorOpenForDelete")
const buttonEditorCloseForDelete = document.getElementById("buttonEditorCloseForDelete")
const editorDialogForDelete = document.getElementById("editorDialogForDelete")
const buttonEditorCloseForDeleteInEditor = document.getElementById("buttonEditorCloseForDeleteInEditor")

if (buttonEditorOpenForDelete && buttonEditorCloseForDelete && editorDialogForDelete && buttonEditorCloseForDeleteInEditor) {
    buttonEditorOpenForDelete.addEventListener("click", () => {
        editorDialogForDelete.show()
    })
    
    buttonEditorCloseForDelete.addEventListener("click", () => {
        editorDialogForDelete.close()
    })

    buttonEditorCloseForDeleteInEditor.addEventListener("click", () => {
        editorDialogForDelete.close()
    })
}
