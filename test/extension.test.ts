// The module "assert" provides assertion methods from node
import * as assert from "assert";
import * as path from "path";

// You can import and use all API from the "vscode" module
// as well as import your extension to test it
import * as vscode from "vscode";
import { Formatter } from "../src/extension";

// Defines a Mocha test suite to group tests of similar kind together
describe("Formatter", () =>
{
    let editor: vscode.TextEditor;
    let textEdit: vscode.TextEditorEdit;
    beforeEach((done) =>
    {
        const pathToTestFile = path.join(__dirname, "../../test/testDocument.ts");
        vscode.workspace.openTextDocument(vscode.Uri.file(pathToTestFile))
            .then((textDocument: vscode.TextDocument) =>
            {
                vscode.window.showTextDocument(textDocument)
                    .then((textEditor: vscode.TextEditor) =>
                    {
                        editor = textEditor;
                        editor.edit((edit: vscode.TextEditorEdit) =>
                        {
                            textEdit = edit;
                            done();
                        });

                    }, err => console.error(err));
            }, err => console.error(err));
    });

    describe("When line is empty", () =>
    {
        it("should insert another empty line and move the cursor to it", () =>
        {
            editor.selection = new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(0, 0));
            new Formatter(editor, textEdit).format();
        });
    });

    describe("When line is a simple statement without a semicolon", () =>
    {
        it("should insert the semicolon and move the cursor to the end of the line");
    });

    describe("When line is a simple statement with a semicolon", () =>
    {
        it("should insert a new line and move the cursor to it");
    });

    describe("When line is an incomplete if statement", () =>
    {
        it("should complete the statement with the necessary parentheses and braces, and move the cursor to the parentheses");
    });

    describe("When line is an incomplete for statement", () =>
    {
        it("should complete the statement with the necessary parentheses and braces, and move the cursor to the parentheses");
    });

    describe("When line is a incomplete while loop", () =>
    {
        it("should complete the statement with the necessary parentheses and braces, and move the cursor to the parentheses");
    });

    describe("If the auto-format setting is true", () =>
    {
        it("should format the document after making the edit");
    });
});