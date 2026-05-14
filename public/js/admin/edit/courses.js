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

// Add parameters fields function
function scriptAddParametersFieldsInCourses(buttonId, table) {
    if (table === "Courses") {
        document.getElementById(buttonId).addEventListener("click", () => {
            document.getElementById("formEditor").insertBefore(document.createRange().createContextualFragment(ElCreator("unpaired", "input", {
                name: "course_parameter",
                placeholder: "Параметр (необязательно)",
            })), document.getElementById(buttonId))
        })
    }
}

function scriptAddParametersFieldsInPricing(buttonId, table) {
    if (table === "Pricing") {
        document.getElementById(buttonId).addEventListener("click", () => {
            document.getElementById("formEditor").insertBefore(document.createRange().createContextualFragment(ElCreator("unpaired", "input", {
                name: "pricing_parameter",
                placeholder: "Параметр (необязательно)",
            })), document.getElementById(buttonId))
        })
    }
}

const editor_content = {
    "Benifits": {
        "insert": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Новое преимущество"),
            ElCreator("unpaired", "input", {
                name: "benifit_title",
                placeholder: "Заголовок",
                required: "true",
            }),
            ElCreator("paired", "textarea", {
                name: "benifit_description",
                placeholder: "Описание",
                required: "true",
            }),
            ElCreator("unpaired", "input", {
                type: "file",
                name: "benifit_image",
                accept: "image/*",
                required: "true",
            }),
            ElCreator("paired", "button", {
                type: "submit",
            }, "Создать"),
        ],
        "delete": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Удалить преимущество"),
            ElCreator("paired", "a", {
                href: "/admin/edit/courses",
                type: "return"
            }, "Не удалять"),
            ElCreator("paired", "button", {
                type: "submit",
                class: "destroy",
            }, "Удалить"),
        ],
        "truncate": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Удалить все преимущества"),
            ElCreator("paired", "a", {
                href: "/admin/edit/courses",
                type: "return"
            }, "Не удалять"),
            ElCreator("paired", "button", {
                type: "submit",
                class: "destroy",
            }, "Удалить"),
        ],
    },
    "Courses": {
        "insert": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Новый курс"),
            ElCreator("unpaired", "input", {
                name: "course_title",
                placeholder: "Заголовок",
                required: "true",
            }),
            ElCreator("paired", "textarea", {
                name: "course_description",
                placeholder: "Описание",
                required: "true",
            }),
            ElCreator("paired", "div", {
                class: "color-selector",
            },
                `
                ${ElCreator("unpaired", "input", {
                    type: "color",
                    name: "course_color",
                    id: "inputCourseColor",
                    reqiured: "true",
                })}
                ${ElCreator("paired", "label", {
                    type: "color",
                    name: "course_color",
                    for: "inputCourseColor"
                }, "Цвет фона")}
            `),
            ElCreator("unpaired", "input", {
                name: "course_agelimit",
                placeholder: "Возрастное ограничение (необязательно)",
            }),
            ElCreator("unpaired", "input", {
                name: "course_duration",
                placeholder: "Продолжительность (необязательно)",
            }),
            ElCreator("paired", "button", {
                id: "buttonCourses",
                type: "button",
            }, "Добавить параметр"),
            ElCreator("paired", "button", {
                type: "submit",
            }, "Создать"),
        ],
        "delete": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Удалить курс"),
            ElCreator("paired", "a", {
                href: "/admin/edit/courses",
                type: "return"
            }, "Не удалять"),
            ElCreator("paired", "button", {
                type: "submit",
                class: "destroy",
            }, "Удалить"),
        ],
        "truncate": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Удалить все курсы"),
            ElCreator("paired", "a", {
                href: "/admin/edit/courses",
                type: "return"
            }, "Не удалять"),
            ElCreator("paired", "button", {
                type: "submit",
                class: "destroy",
            }, "Удалить"),
        ],
    },
    "Sales": {
        "update": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Скидки"),
            dialogSandboxEditorControls,
            ElCreator("paired", "textarea", {
                id: "textareaSales",
                name: "sales_content",
                placeholder: "Содержание",
                required: "true",
            }, pageData.Sales.find(entry => entry.sale_type === "Содержание")?.sale_content || ""),
            ElCreator("paired", "button", {
                type: "submit",
            }, "Изменить"),
        ]
    },
    "Pricing": {
        "insert": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Новая цена"),
            ElCreator("unpaired", "input", {
                name: "pricing_title",
                placeholder: "Раздел",
                required: "true",
            }),
            ElCreator("unpaired", "input", {
                name: "pricing_subtitle",
                placeholder: "Заголовок",
                required: "true",
            }),
            ElCreator("unpaired", "input", {
                name: "pricing_price",
                placeholder: "Цена, ₽",
                type: "number",
                required: "true",
            }),
            ElCreator("unpaired", "input", {
                name: "pricing_old_price",
                placeholder: "Старая цена, ₽ (необязательно)",
                type: "number",
            }),
            ElCreator("paired", "button", {
                id: "buttonPricing",
                type: "button",
            }, "Добавить параметр"),
            ElCreator("paired", "button", {
                type: "submit",
            }, "Создать"),
        ],
        "delete": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Удалить цену"),
            ElCreator("paired", "a", {
                href: "/admin/edit/courses",
                type: "return"
            }, "Не удалять"),
            ElCreator("paired", "button", {
                type: "submit",
                class: "destroy",
            }, "Удалить"),
        ],
        "truncate": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Удалить все цены"),
            ElCreator("paired", "a", {
                href: "/admin/edit/courses",
                type: "return"
            }, "Не удалять"),
            ElCreator("paired", "button", {
                type: "submit",
                class: "destroy",
            }, "Удалить"),
        ],
    },
}

// Editor dialog

const dialogEditor = document.getElementById("editorDialog")
const dialogEditorForm = document.getElementById("formEditor")

function EditorInit(action, table, id = "", has_file = false) {
    while (dialogEditorForm.firstChild) {
        dialogEditorForm.removeChild(dialogEditorForm.firstChild)
    }
    for (let tag of editor_content[table][action]) {
        dialogEditorForm.insertAdjacentHTML('beforeend', tag)
    }
    if (table === "Courses" && action === "insert") scriptAddParametersFieldsInCourses(`button${table}`, table)
    if (table === "Pricing" && action === "insert") scriptAddParametersFieldsInPricing(`button${table}`, table)
    dialogEditorForm.setAttribute("method", "post")
    dialogEditorForm.setAttribute("action", `table/${table}/${action}/${id}`)
    if (has_file) dialogEditorForm.setAttribute("enctype", "multipart/form-data")
    else dialogEditorForm.removeAttribute("enctype")
    dialogEditor.show()
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
    dialogSandboxEditorForm.setAttribute("method", "post")
    dialogSandboxEditorForm.setAttribute("action", `table/${table}/${action}/${id}`)
    dialogSandboxEditor.show()
}

// Editor handler

const buttonsAddItem = document.querySelectorAll(".add-item")

buttonsAddItem.forEach(button => {
    button.addEventListener("click", () => {
        EditorInit("insert", button.getAttribute("table"), "", button.getAttribute("has_file"))
    })
});

const buttonDialogEditorClose = document.getElementById("editorClose")

buttonDialogEditorClose.addEventListener("click", () => {
    dialogEditor.close()
})

const buttonDialogSandboxEditorClose = document.getElementById("SandboxEditorClose")

buttonDialogSandboxEditorClose.addEventListener("click", () => {
    dialogSandboxEditor.close()
})

const buttonsDeleteItem = document.querySelectorAll(".panel-content-item-delete")

buttonsDeleteItem.forEach(button => {
    button.addEventListener("click", () => {
        EditorInit("delete", button.getAttribute("table"), button.getAttribute("item-id"))
    })
})

const buttonsTruncateItems = document.querySelectorAll(".truncate-items")

buttonsTruncateItems.forEach(button => {
    button.addEventListener("click", () => {
        EditorInit("truncate", button.getAttribute("table"))
    })
})

const buttonsUpdateItems = document.querySelectorAll(".update-items")

buttonsUpdateItems.forEach(button => {
    button.addEventListener("click", () => {
        if (button.getAttribute("sandbox")) SandboxInit("update", button.getAttribute("table"), button.getAttribute("item-id"))
        else EditorInit("update", button.getAttribute("table"), button.getAttribute("item-id"))
    })
})