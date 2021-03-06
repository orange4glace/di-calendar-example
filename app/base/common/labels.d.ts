import { URI } from 'base/common/uri';
export interface IWorkspaceFolderProvider {
    getWorkspaceFolder(resource: URI): {
        uri: URI;
        name?: string;
    } | null;
    getWorkspace(): {
        folders: {
            uri: URI;
            name?: string;
        }[];
    };
}
export interface IUserHomeProvider {
    userHome: string;
}
/**
 * @deprecated use LabelService instead
 */
export declare function getPathLabel(resource: URI | string, userHomeProvider?: IUserHomeProvider, rootProvider?: IWorkspaceFolderProvider): string;
export declare function getBaseLabel(resource: URI | string): string;
export declare function getBaseLabel(resource: URI | string | undefined): string | undefined;
export declare function normalizeDriveLetter(path: string): string;
export declare function tildify(path: string, userHome: string): string;
export declare function untildify(path: string, userHome: string): string;
export declare function shorten(paths: string[]): string[];
export interface ISeparator {
    label: string;
}
/**
 * Helper to insert values for specific template variables into the string. E.g. "this $(is) a $(template)" can be
 * passed to this function together with an object that maps "is" and "template" to strings to have them replaced.
 * @param value string to which templating is applied
 * @param values the values of the templates to use
 */
export declare function template(template: string, values?: {
    [key: string]: string | ISeparator | null;
}): string;
/**
 * Handles mnemonics for menu items. Depending on OS:
 * - Windows: Supported via & character (replace && with &)
 * -   Linux: Supported via & character (replace && with &)
 * -   macOS: Unsupported (replace && with empty string)
 */
export declare function mnemonicMenuLabel(label: string, forceDisableMnemonics?: boolean): string;
/**
 * Handles mnemonics for buttons. Depending on OS:
 * - Windows: Supported via & character (replace && with & and & with && for escaping)
 * -   Linux: Supported via _ character (replace && with _)
 * -   macOS: Unsupported (replace && with empty string)
 */
export declare function mnemonicButtonLabel(label: string, forceDisableMnemonics?: boolean): string;
export declare function unmnemonicLabel(label: string): string;
/**
 * Splits a path in name and parent path, supporting both '/' and '\'
 */
export declare function splitName(fullPath: string): {
    name: string;
    parentPath: string;
};
