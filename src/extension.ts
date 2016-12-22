'use strict';
import { commands, Disposable, ExtensionContext, Position, Selection, TextEditor, TextEditorEdit, TextLine, window, workspace } from 'vscode';

export function activate(context: ExtensionContext)
{
    const disposable: Disposable = commands.registerTextEditorCommand("extension.complete-it", (editor: TextEditor, edit: TextEditorEdit) =>
    {
        editor.edit((editBuilder: TextEditorEdit) =>
        {
            new Formatter(editor, edit).format();
        }).then((response: boolean) =>
        {
            // Now that the edit has been applied, work out if the cursor needs to be repositioned
            const text = window.activeTextEditor.document.getText();
            // if (!editor.document.lineAt(editor.selection.active.line).isEmptyOrWhitespace)
            // {
            //     const postition = editor.selection.active.translate();
            //     editor.selection = new Selection(postition, postition);
            // }

            const formatDocument: boolean = workspace.getConfiguration("complete-it").get("formatDocument", true);

            if (formatDocument)
            {
                commands.executeCommand("editor.action.formatDocument");
            }
        });
    });

    context.subscriptions.push(disposable);
}

export class Formatter
{
    private lineText: TextLine;

    private tabSize: number;

    constructor(private editor: TextEditor, private edit: TextEditorEdit)
    {
        this.lineText = editor.document.lineAt(editor.selection.active.line);
        this.tabSize = workspace.getConfiguration("editor").get("tabSize", 4);
    }

    public format(): void
    {
        if (this.lineText.isEmptyOrWhitespace)
        {
            this.addNewLine(true);
            return;
        }

        if (this.lineText.text.endsWith(";"))
        {
            this.addNewLine(true);
            return;
        }

        if (!this.isComplexStatement())
        {
            this.edit.insert(this.lineText.range.end, ";");
        }
    }

    private addNewLine(addIndent: boolean = false): void
    {
        const currentIndent: number = this.lineText.firstNonWhitespaceCharacterIndex;
        let extraWhiteSpace: string = "";

        // if (addIndent)
        // {
        //     for (let i = 0; i < currentIndent; i++)
        //     {
        //         extraWhiteSpace += " ";
        //     }
        // }

        this.edit.insert(this.lineText.range.end, "\n" + extraWhiteSpace);
        // const newPosition: Position = new Position(this.lineText.lineNumber + 1, currentIndent);
        // this.editor.selection = new Selection(newPosition, newPosition);
    }

    private isComplexStatement(): boolean
    {
        const currentText: string = this.lineText.text;

        return currentText.includes("if") || currentText.includes("else") || currentText.includes("for") || currentText.includes("while") || false;
    }
}