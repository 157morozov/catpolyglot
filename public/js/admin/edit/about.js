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

const editor_content = {
    "Home": {
        "update": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Главная страница"),
            ElCreator("unpaired", "input", {
                name: "home_title",
                type: "text",
                placeholder: "Заголовок",
                required: "true",
                value: cache.Home.find(entry => entry.home_type === "Заголовок")?.home_content || "",
            }),
            ElCreator("paired", "textarea", {
                name: "home_content",
                placeholder: "Содержание",
                required: "true",
            }, cache.Home.find(entry => entry.home_type === "Содержание")?.home_content || ""),
            ElCreator("unpaired", "input", {
                name: "misc_content",
                type: "file",
                accept: "image/*",
                id: "inpHomeBanner"
            }),
            ElCreator("paired", "button", {
                type: "submit",
            }, "Изменить"),
        ]
    },
    "About": {
        "update": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "О нас"),
            dialogSandboxEditorControls,
            ElCreator("paired", "textarea", {
                id: "textareaAbout",
                name: "about_content",
                placeholder: "Содержание",
                required: "true",
            }, cache.About.find(entry => entry.about_type === "Содержание")?.about_content || ""),
            ElCreator("paired", "button", {
                type: "submit",
            }, "Изменить"),
        ]
    },
    "TaxDeduction": {
        "update": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Налоговый вычет"),
            dialogSandboxEditorControls,
            ElCreator("paired", "textarea", {
                id: "textareaTaxDeduction",
                name: "td_content",
                placeholder: "Содержание",
                required: "true",
            }, cache.TaxDeduction.find(entry => entry.td_type === "Содержание")?.td_content || ""),
            ElCreator("paired", "button", {
                type: "submit",
            }, "Изменить"),
        ]
    },
    "GlobalLinks": {
        "insert": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Новая глобальная ссылка"),
            ElCreator("paired", "select", {
                name: "gl_type",
                required: "true",
            },
                `
                ${ElCreator("paired", "option", {
                    selected: "true",
                    disabled: "true",
                    value: "",
                }, "Выберите тип ссылки")}
                ${ElCreator("paired", "option", {
                    value: "Записаться",
                }, "Записаться")}
                ${ElCreator("paired", "option", {
                    value: "Оплатить",
                }, "Оплатить")}
                ${ElCreator("paired", "option", {
                    value: "ДоговорОферты",
                }, "ДоговорОферты")}
                ${ElCreator("paired", "option", {
                    value: "ПолитикаКонфиденциальности",
                }, "ПолитикаКонфиденциальности")}
                `
            ),
            ElCreator("unpaired", "input", {
                name: "gl_link",
                type: "url",
                pattern: "https://.*",
                placeholder: "Ссылка (https://example.com)",
                required: "true",
            }),
            ElCreator("paired", "button", {
                type: "submit",
            }, "Создать"),
        ],
        "delete": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Удалить глобальную ссылку"),
            ElCreator("paired", "a", {
                href: "/admin/edit/about",
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
            }, "Удалить все ссылки"),
            ElCreator("paired", "a", {
                href: "/admin/edit/about",
                type: "return"
            }, "Не удалять"),
            ElCreator("paired", "button", {
                type: "submit",
                class: "destroy",
            }, "Удалить"),
        ],
    },
    "Contacts": {
        "insert": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Новый контакт"),
            ElCreator("paired", "select", {
                name: "contact_type",
                required: "true",
                value: "",
            },
                `
                ${ElCreator("paired", "option", {
                    selected: "true",
                    disabled: "true",
                }, "Выберите тип контакта")}
                ${ElCreator("paired", "option", {
                    value: "Телефон",
                }, "Телефон")}
                ${ElCreator("paired", "option", {
                    value: "Почта",
                }, "Почта")}
                ${ElCreator("paired", "option", {
                    value: "Whatsapp",
                }, "Whatsapp")}
                ${ElCreator("paired", "option", {
                    value: "Telegram",
                }, "Telegram")}
                ${ElCreator("paired", "option", {
                    value: "VK",
                }, "VK")}
                ${ElCreator("paired", "option", {
                    value: "Viber",
                }, "Viber")}
                `
            ),
            ElCreator("unpaired", "input", {
                name: "contact_content",
                placeholder: "Содержание",
                required: "true",
            }),
            ElCreator("paired", "button", {
                type: "submit",
            }, "Создать"),
        ],
        "delete": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Удалить контакт"),
            ElCreator("paired", "a", {
                href: "/admin/edit/about",
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
            }, "Удалить все контакты"),
            ElCreator("paired", "a", {
                href: "/admin/edit/about",
                type: "return"
            }, "Не удалять"),
            ElCreator("paired", "button", {
                type: "submit",
                class: "destroy",
            }, "Удалить"),
        ],
    },
    "Addresses": {
        "insert": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Новый адрес"),
            ElCreator("unpaired", "input", {
                name: "address_title",
                placeholder: "Заголовок",
                required: "true",
            }),
            ElCreator("paired", "textarea", {
                name: "address_description",
                placeholder: "Описание",
            }),
            ElCreator("unpaired", "input", {
                type: "file",
                name: "address_image",
                accept: "image/*",
            }),
            ElCreator("unpaired", "input", {
                name: "address_latitude",
                placeholder: "Широта",
                required: "true",
            }),
            ElCreator("unpaired", "input", {
                name: "address_longitude",
                placeholder: "Долгота",
                required: "true",
            }),
            ElCreator("paired", "button", {
                type: "submit",
            }, "Создать"),
        ],
        "delete": [
            ElCreator("paired", "h3", {
                class: "editor-title",
            }, "Удалить адрес"),
            ElCreator("paired", "a", {
                href: "/admin/edit/about",
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
            }, "Удалить все адреса"),
            ElCreator("paired", "a", {
                href: "/admin/edit/about",
                type: "return"
            }, "Не удалять"),
            ElCreator("paired", "button", {
                type: "submit",
                class: "destroy",
            }, "Удалить"),
        ],
    }
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
        else EditorInit("update", button.getAttribute("table"), button.getAttribute("item-id"), button.getAttribute("has_file"))
    })
})